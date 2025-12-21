"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// 選手データ型定義
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
}

interface Staff {
  name: string;
  fullName: string;
  reading: string;
  role: string;
  image?: string;
}

interface MembersData {
  fourthYear: Member[];
  thirdYear: Member[];
  secondYear: Member[];
  firstYear: Member[];
}

// 学年データ（大学院を削除）
const gradeData = [
  { id: '4year', label: '4年生', en: '4th Year', key: 'fourthYear' as const },
  { id: '3year', label: '3年生', en: '3rd Year', key: 'thirdYear' as const },
  { id: '2year', label: '2年生', en: '2nd Year', key: 'secondYear' as const },
  { id: '1year', label: '1年生', en: '1st Year', key: 'firstYear' as const },
  { id: 'staff', label: 'スタッフ', en: 'STAFF', key: null },
];

// Parallax Hero
function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <motion.section
      ref={ref}
      className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Dynamic Background */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-daito-green/30 via-transparent to-daito-orange/20" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 40%, rgba(0, 77, 37, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(243, 152, 0, 0.2) 0%, transparent 50%)
            `,
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-daito-orange font-mono text-sm tracking-[0.3em] mb-6">
            TEAM ROSTER
          </p>

          <h1 className="text-white">
            <span className="block text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-none">
              部員紹介
            </span>
            <span className="block text-lg md:text-xl font-light tracking-[0.3em] mt-4 text-white/50">
              MEMBERS
            </span>
          </h1>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// Member Card - Simple Design with No Image Placeholder
function MemberCard({ member, index }: { member: Member; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <motion.div
        className="relative bg-white border border-neutral-100 rounded-2xl overflow-hidden transition-all duration-500 hover:border-neutral-200 hover:shadow-2xl hover:shadow-neutral-200/50"
        whileHover={{ y: -4 }}
      >
        {/* Image / No Image Placeholder */}
        <div className="aspect-[3/4] bg-neutral-100 relative overflow-hidden">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.fullName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
              <span className="text-sm text-neutral-400 tracking-wider">NO IMAGE</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Name & Reading */}
          <h3 className="text-lg font-medium text-neutral-900 tracking-tight group-hover:text-daito-green transition-colors duration-300">
            {member.fullName}
          </h3>
          <p className="text-[10px] tracking-[0.15em] text-neutral-400 mt-1 uppercase">
            {member.reading}
          </p>

          {/* Personal Bests - All Events */}
          {member.personalBests.length > 0 && (
            <div className="mt-4 pt-4 border-t border-neutral-100">
              <div className="flex flex-wrap gap-2">
                {member.personalBests.map((pb) => (
                  <div
                    key={pb.event}
                    className="inline-flex items-baseline gap-1 bg-neutral-50 px-2.5 py-1 rounded-md"
                  >
                    <span className="text-[9px] text-neutral-400 uppercase tracking-wider">{pb.event}</span>
                    <span className="text-xs font-mono font-medium text-neutral-800">{pb.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Gradient Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-daito-green to-daito-orange"
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    </motion.article>
  );
}

// Staff Card - Simple Design with No Image Placeholder
function StaffCard({ staff, index }: { staff: Staff; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <motion.div
        className="relative bg-white border border-neutral-100 rounded-2xl overflow-hidden transition-all duration-500 hover:border-daito-orange/30 hover:shadow-2xl hover:shadow-orange-100/50"
        whileHover={{ y: -4 }}
      >
        {/* Image / No Image Placeholder */}
        <div className="aspect-[3/4] bg-neutral-100 relative overflow-hidden">
          {staff.image ? (
            <Image
              src={staff.image}
              alt={staff.fullName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
              <span className="text-sm text-neutral-400 tracking-wider">NO IMAGE</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="inline-flex px-3 py-1 bg-daito-orange/10 text-daito-orange text-[10px] tracking-wider font-medium rounded-full mb-2">
            {staff.role}
          </div>
          <h3 className="text-lg font-medium text-neutral-900 tracking-tight">
            {staff.fullName}
          </h3>
          <p className="text-[10px] tracking-[0.15em] text-neutral-400 mt-1 uppercase">
            {staff.reading}
          </p>
        </div>

        {/* Bottom Gradient Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-daito-orange to-daito-gold"
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    </motion.article>
  );
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="bg-neutral-100 rounded-2xl overflow-hidden animate-pulse">
          <div className="aspect-[3/4] bg-neutral-200" />
          <div className="p-5">
            <div className="h-5 bg-neutral-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-neutral-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Main Component
export default function MembersPage() {
  const [activeTab, setActiveTab] = useState('4year');
  const [membersData, setMembersData] = useState<MembersData>({
    fourthYear: [],
    thirdYear: [],
    secondYear: [],
    firstYear: [],
  });
  const [staffData, setStaffData] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [grade1, grade2, grade3, grade4, graduate, staff] = await Promise.all([
          fetch('/data/members/grade1.json').then(res => res.json()),
          fetch('/data/members/grade2.json').then(res => res.json()),
          fetch('/data/members/grade3.json').then(res => res.json()),
          fetch('/data/members/grade4.json').then(res => res.json()),
          fetch('/data/members/graduate.json').then(res => res.json()).catch(() => ({ members: [] })),
          fetch('/data/members/staff.json').then(res => res.json()),
        ]);

        // 大学院生を4年生に統合
        const fourthYearMembers = [...(grade4.members || []), ...(graduate.members || [])];

        setMembersData({
          firstYear: grade1.members || [],
          secondYear: grade2.members || [],
          thirdYear: grade3.members || [],
          fourthYear: fourthYearMembers,
        });
        setStaffData(staff.staff || []);
      } catch (error) {
        console.error('Failed to load members data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const activeGrade = gradeData.find(g => g.id === activeTab);
  const currentMembers = activeGrade?.key ? membersData[activeGrade.key] : [];

  return (
    <div className="min-h-screen bg-neutral-50">
      <ParallaxHero />

      {/* Tab Navigation - Modern Design */}
      <div className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100">
        <div className="container mx-auto px-6">
          <div className="flex justify-center py-4 gap-1">
            {gradeData.map((grade, index) => (
              <button
                key={grade.id}
                onClick={() => setActiveTab(grade.id)}
                className={cn(
                  "relative px-6 py-3 text-sm font-medium transition-all duration-300",
                  activeTab === grade.id
                    ? "text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                {grade.label}
                {/* Underline indicator */}
                {activeTab === grade.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-daito-green"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {/* Section Header */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-7xl md:text-8xl font-serif font-light text-neutral-100">
                    {activeGrade?.en.charAt(0)}
                  </span>
                  <div className="-ml-4">
                    <div className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
                      {activeGrade?.en}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-medium text-neutral-900">
                      {activeGrade?.label}
                    </h2>
                  </div>
                </div>
              </motion.div>

              {/* Grid */}
              <motion.div
                key={`grid-${activeTab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {activeTab === 'staff' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {staffData.map((staff, index) => (
                      <StaffCard key={staff.name} staff={staff} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {currentMembers.map((member, index) => (
                      <MemberCard key={member.name} member={member} index={index} />
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {!isLoading && (activeTab === 'staff' ? staffData.length === 0 : currentMembers.length === 0) && (
                  <div className="text-center py-20 text-neutral-400">
                    データがありません
                  </div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
