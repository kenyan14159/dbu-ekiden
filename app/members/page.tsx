import fs from 'fs';
import path from 'path';
import Script from 'next/script';
import { generatePersonSchema } from '@/lib/structured-data';
import MembersClient from './MembersClient';

interface PersonalBest {
  event: string;
  time: string;
}

interface Member {
  name: string;
  fullName: string;
  reading: string;
  image?: string;
  personalBests: PersonalBest[];
  highSchool?: string;
  faculty?: string;
  department?: string;
}

interface Staff {
  name: string;
  fullName: string;
  reading: string;
  role: string;
  image?: string;
}

export const dynamic = 'force-static';

const normalizePersonalBests = (member: { personalBests?: PersonalBest[] } | null | undefined) =>
  member?.personalBests ?? [];

const normalizeMember = (member: Partial<Member> & { personalBests?: PersonalBest[] }) => ({
  name: member.name ?? member.fullName ?? '',
  fullName: member.fullName ?? member.name ?? '',
  reading: member.reading ?? '',
  image: member.image,
  personalBests: normalizePersonalBests(member),
  highSchool: member.highSchool,
  faculty: member.faculty,
  department: member.department,
});

interface MembersData {
  fourthYear: Member[];
  thirdYear: Member[];
  secondYear: Member[];
  firstYear: Member[];
}

async function getMembersData(): Promise<{ membersData: MembersData; staffData: Staff[] }> {
  try {
    const [grade1, grade2, grade3, grade4, graduate, staff] = await Promise.all([
      fs.promises.readFile(path.join(process.cwd(), 'public/data/members/grade1.json'), 'utf8').then(JSON.parse),
      fs.promises.readFile(path.join(process.cwd(), 'public/data/members/grade2.json'), 'utf8').then(JSON.parse),
      fs.promises.readFile(path.join(process.cwd(), 'public/data/members/grade3.json'), 'utf8').then(JSON.parse),
      fs.promises.readFile(path.join(process.cwd(), 'public/data/members/grade4.json'), 'utf8').then(JSON.parse),
      fs.promises.readFile(path.join(process.cwd(), 'public/data/members/graduate.json'), 'utf8').then(JSON.parse).catch(() => ({ members: [] })),
      fs.promises.readFile(path.join(process.cwd(), 'public/data/members/staff.json'), 'utf8').then(JSON.parse),
    ]);

    const fourthYearMembers = [...(grade4.members || []), ...(graduate.members || [])];

    return {
      membersData: {
        firstYear: (grade1.members || []).map(normalizeMember),
        secondYear: (grade2.members || []).map(normalizeMember),
        thirdYear: (grade3.members || []).map(normalizeMember),
        fourthYear: fourthYearMembers.map(normalizeMember),
      },
      staffData: staff.staff || [],
    };
  } catch (error) {
    console.error('Failed to load members data:', error);
    return {
      membersData: {
        fourthYear: [],
        thirdYear: [],
        secondYear: [],
        firstYear: [],
      },
      staffData: [],
    };
  }
}

export default async function MembersPage() {
  const { membersData, staffData } = await getMembersData();

  // すべてのメンバーの構造化データを生成
  const allMembers = [
    ...membersData.fourthYear.map(m => ({ ...m, grade: 4 })),
    ...membersData.thirdYear.map(m => ({ ...m, grade: 3 })),
    ...membersData.secondYear.map(m => ({ ...m, grade: 2 })),
    ...membersData.firstYear.map(m => ({ ...m, grade: 1 })),
  ];

  return (
    <>
      {/* 構造化データを生成 */}
      {allMembers.map((member, index) => {
        const personSchema = generatePersonSchema({
          name: member.fullName,
          affiliation: '大東文化大学陸上競技部男子長距離ブロック',
          alumniOf: member.highSchool,
          image: member.image,
          jobTitle: `${member.grade}年生`,
        });

        return (
          <Script
            key={`person-schema-${member.name}-${index}`}
            id={`person-schema-${member.name}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />
        );
      })}
      <MembersClient membersData={membersData} staffData={staffData} />
    </>
  );
}
