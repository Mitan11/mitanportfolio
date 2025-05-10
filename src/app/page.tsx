import { FloatingNav } from "@/components/ui/floating-navbar"
import { navItems } from "@/data/index"
import Grid from "@/components/Grid"
import Hero from "@/components/Hero"
import RecentProjects from "@/components/RecentProjects"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import Clients from "@/components/Clients"
import Experience from "@/components/Experience"
import Footer from "@/components/Footer"
import { SocialDock } from "@/components/ui/social-dock"

function page() {
return (
  <main className='relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto px-5 sm:px-10 '>
    <div className='max-w-7xl w-full '>
        <ScrollProgress />
        <SocialDock />
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <Experience />
        <RecentProjects />
        <Clients />
        <Footer />
      </div>
    </main >
  )
}

export default page