import Hero from '@/app/components/home/Hero';
import TopRecords from '@/app/components/home/TopRecords';
import TeamInfo from '@/app/components/home/TeamInfo';
import TeamLinks from '@/app/components/home/TeamLinks';
import ObNewsPreview from '@/app/components/home/ObNewsPreview';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ObNewsPreview />
      <TopRecords />
      <TeamLinks />
      <TeamInfo />
    </main>
  );
}
