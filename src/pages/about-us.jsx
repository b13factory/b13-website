// website/src/pages/about-us.jsx
import Head from 'next/head';
import Image from 'next/image';
import { Users, Target, Award, Heart } from 'lucide-react';
import Button from '@/components/ui/Button';
import AboutBanner from '@/components/about/AboutBanner';

export default function AboutUs({ aboutData }) {

  // Prepare values array from aboutData
  const values = aboutData ? [
    {
      icon: <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: aboutData.mission?.title || 'Mission',
      description: aboutData.mission?.description || ''
    },
    {
      icon: <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: aboutData.vision?.title || 'Vision', 
      description: aboutData.vision?.description || ''
    },
    {
      icon: <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: aboutData.values?.title || 'Values',
      description: aboutData.values?.description || ''
    }
  ] : [];

  // Get team sections from aboutData
  const team = aboutData?.team_sections || [];

  return (
    <>
      <Head>
        <title>Tentang Kami - B13 Factory | Konfeksi & Garment Jember</title>
        <meta name="description" content="B13 Factory adalah specialist konfeksi, garment dan advertising di Jember dengan pengalaman lebih dari 15 tahun. Jasa sablon, bordir, dan produksi kaos berkualitas." />
        <meta name="keywords" content="konfeksi jember, garment jember, sablon jember, bordir jember, kaos custom jember, tentang b13 factory" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Tentang Kami - B13 Factory | Garment & Advertising Jember" />
        <meta property="og:description" content="B13 Factory adalah specialist konfeksi, garment dan advertising di Jember dengan pengalaman lebih dari 15 tahun." />
        <meta property="og:url" content="https://b13garment.id/about-us" />
        <meta property="og:type" content="website" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://b13garment.id/about-us" />
      </Head>

      {/* Banner Section */}
      <AboutBanner banner={aboutData} />

      {/* Company Overview - Mobile Optimized */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
            <div className="flex flex-col">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 text-neutral-900">
                {aboutData?.company_title || 'Garment & Advertising Specialist'}
              </h2>
              <div className="space-y-3 sm:space-y-4 text-neutral-700 prose prose-sm sm:prose-base max-w-none">
                {aboutData?.company_description ? (
                  <div 
                    className="text-sm sm:text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: aboutData.company_description.replace(/\n/g, '<br />') }} 
                  />
                ) : (
                  <>
                    <p className="text-sm sm:text-base">
                      <strong>B13 Factory</strong> telah berdiri sejak 2019 dan telah dipercaya oleh berbagai klien 
                      dari berbagai industri untuk memenuhi kebutuhan garment dan advertising mereka.
                    </p>
                    <p className="text-sm sm:text-base">
                      Kami mengkhususkan diri dalam jasa sablon, bordir, dan berbagai produk advertising 
                      seperti banner, spanduk, dan merchandise promosi.
                    </p>
                    <p className="text-sm sm:text-base">
                      Dengan tim yang profesional dan berpengalaman, kami siap membantu mewujudkan 
                      ide dan konsep Anda menjadi produk yang berkualitas dan bernilai.
                    </p>
                  </>
                )}
              </div>

              {aboutData?.company_stats && (
                <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1 sm:mb-2">{aboutData.company_stats.years_experience}</div>
                    <div className="text-neutral-600 text-xs sm:text-sm">Tahun Pengalaman</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-secondary-600 mb-1 sm:mb-2">{aboutData.company_stats.projects_completed}</div>
                    <div className="text-neutral-600 text-xs sm:text-sm">Project Selesai</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-accent-500 mb-1 sm:mb-2">{aboutData.company_stats.happy_clients}</div>
                    <div className="text-neutral-600 text-xs sm:text-sm">Klien Puas</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start justify-center lg:justify-end mt-6 lg:mt-0">
              {aboutData?.company_image ? (
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg w-full aspect-square max-w-md relative">
                  <Image 
                    src={aboutData.company_image} 
                    alt="B13 Factory Team"
                    fill
                    className="object-cover"
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 448px"
                  />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 aspect-square flex items-center justify-center w-full max-w-md">
                  <div className="text-center">
                    <Users className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary-600 mx-auto mb-4 sm:mb-6" />
                    <p className="text-base sm:text-lg md:text-xl font-semibold text-neutral-700">Company Image/Logo</p>
                    <p className="text-neutral-600 mt-2 text-xs sm:text-sm">B13 Factory Team</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values - Mobile Optimized */}
      <section className="py-8 sm:py-12 md:py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-neutral-900">
              Our Principles
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto">
              Pedoman yang menjadi dasar setiap pekerjaan dan layanan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-primary-600 mx-auto mb-4 sm:mb-5 md:mb-6">
                  {value.icon}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-neutral-900">{value.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Mobile Optimized */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-neutral-900">
              Our Team
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto">
              Tim profesional yang siap membantu mewujudkan kebutuhan garment dan advertising Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 md:gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full mx-auto mb-4 sm:mb-5 md:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-primary-600" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-neutral-900">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-2 sm:mb-3 text-xs sm:text-sm md:text-base">{member.role}</p>
                <p className="text-neutral-600 text-xs sm:text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Mobile Optimized */}
      <section className="py-8 sm:py-12 md:py-16 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Why Choose B13 Factory?
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {(aboutData?.why_choose_us || []).map((item, index) => (
              <div key={index} className="text-center p-4 sm:p-5 md:p-6">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-white/80 text-xs sm:text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Button href="/contact-us" variant="secondary" className="text-sm sm:text-base">
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

// Server-side rendering dengan ISR
export async function getStaticProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/content/about`).catch(() => null);
    
    let aboutData = {
      banner_title: 'About B13 Factory',
      banner_subtitle: 'Specialist dalam garment dan advertising dengan pengalaman lebih dari 5 tahun',
      company_title: 'Garment & Advertising Specialist',
      company_description: '**B13 Factory** telah berdiri sejak 2019 dan telah dipercaya oleh berbagai klien.',
      company_stats: {
        years_experience: '5+',
        projects_completed: '150+',
        happy_clients: '50+'
      },
      mission: {
        title: 'Mission',
        description: 'Memberikan solusi garment dan advertising terbaik dengan kualitas premium.'
      },
      vision: {
        title: 'Vision',
        description: 'Menjadi partner terpercaya dalam industri garment dan advertising di Indonesia.'
      },
      values: {
        title: 'Values',
        description: 'Integritas, kualitas, dan kepuasan pelanggan adalah nilai utama kami.'
      },
      team_sections: [
        { name: 'Management Team', role: 'Professional & Experienced', description: 'Tim management yang berpengalaman.' },
        { name: 'Production Team', role: 'Skilled Craftsmen', description: 'Tim produksi yang ahli.' },
        { name: 'Design Team', role: 'Creative & Innovative', description: 'Tim design kreatif.' }
      ],
      why_choose_us: [
        { title: 'Quality Materials', description: 'Menggunakan bahan berkualitas terbaik' },
        { title: 'Expert Team', description: 'Tim berpengalaman dan profesional' },
        { title: 'Competitive Price', description: 'Harga kompetitif dengan kualitas premium' },
        { title: 'Fast Delivery', description: 'Proses cepat tanpa mengorbankan kualitas' }
      ]
    };

    if (response && response.ok) {
      const data = await response.json();
      if (data.success && data.about) {
        aboutData = data.about;
      }
    }

    return {
      props: {
        aboutData,
      },
      // Revalidate setiap 1 jam
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        aboutData: {
          banner_title: 'About B13 Factory',
          banner_subtitle: 'Specialist dalam garment dan advertising dengan pengalaman lebih dari 5 tahun',
          company_title: 'Garment & Advertising Specialist',
          company_description: '**B13 Factory** telah berdiri sejak 2019 dan telah dipercaya oleh berbagai klien.',
          company_stats: {
            years_experience: '5+',
            projects_completed: '150+',
            happy_clients: '50+'
          },
          mission: {
            title: 'Mission',
            description: 'Memberikan solusi garment dan advertising terbaik dengan kualitas premium.'
          },
          vision: {
            title: 'Vision',
            description: 'Menjadi partner terpercaya dalam industri garment dan advertising di Indonesia.'
          },
          values: {
            title: 'Values',
            description: 'Integritas, kualitas, dan kepuasan pelanggan adalah nilai utama kami.'
          },
          team_sections: [
            { name: 'Management Team', role: 'Professional & Experienced', description: 'Tim management yang berpengalaman.' },
            { name: 'Production Team', role: 'Skilled Craftsmen', description: 'Tim produksi yang ahli.' },
            { name: 'Design Team', role: 'Creative & Innovative', description: 'Tim design kreatif.' }
          ],
          why_choose_us: [
            { title: 'Quality Materials', description: 'Menggunakan bahan berkualitas terbaik' },
            { title: 'Expert Team', description: 'Tim berpengalaman dan profesional' },
            { title: 'Competitive Price', description: 'Harga kompetitif dengan kualitas premium' },
            { title: 'Fast Delivery', description: 'Proses cepat tanpa mengorbankan kualitas' }
          ]
        },
      },
      revalidate: 3600,
    };
  }
}