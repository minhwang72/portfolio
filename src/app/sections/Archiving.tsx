'use client';

const Archiving = () => {
  const archives = [
    {
      title: 'GitHub',
      link: 'https://github.com/yourusername',
      description: 'Personal and team project repositories',
      stats: [
        { label: 'Repositories', value: '20+' },
        { label: 'Commits', value: '500+' },
        { label: 'Stars', value: '50+' },
      ],
    },
    {
      title: 'Blog',
      link: 'https://yourblog.com',
      description: 'Technical articles and development experiences',
      stats: [
        { label: 'Posts', value: '30+' },
        { label: 'Views', value: '10k+' },
        { label: 'Subscribers', value: '100+' },
      ],
    },
  ];

  return (
    <section id="archiving" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Archiving
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {archives.map((archive) => (
            <a
              key={archive.title}
              href={archive.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4">{archive.title}</h3>
              <p className="text-gray-400 mb-6">{archive.description}</p>
              
              <div className="grid grid-cols-3 gap-4">
                {archive.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-accent text-xl font-bold mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Archiving; 