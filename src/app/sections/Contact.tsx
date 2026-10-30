import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import SectionHead from '../components/SectionHead';
import { CONTACT, certifications } from '../lib/portfolio-data';

const links = [
  { icon: Mail, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Github, label: 'github.com/minhwang72', href: CONTACT.github },
  { icon: Linkedin, label: 'LinkedIn', href: CONTACT.linkedin },
];

export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
      <SectionHead no="05" label="contact" title="함께 만들 이야기가 있다면" desc="메일이 가장 빠릅니다. 이 페이지의 AI에게 먼저 물어보셔도 됩니다." />
      <div className="grid gap-10 lg:grid-cols-2">
        <ul className="space-y-3">
          {links.map(({ icon: Icon, label, href }) => (
            <li key={href}>
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-line bg-panel px-5 py-4 hover:border-accent/50 transition-colors"
              >
                <span className="flex items-center gap-3 text-fg">
                  <Icon className="h-4 w-4 text-accent" />
                  {label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-dim group-hover:text-accent transition-colors" />
              </a>
            </li>
          ))}
        </ul>

        <div>
          <p className="font-mono text-xs text-dim">certifications</p>
          <ul className="mt-4 space-y-4">
            {certifications.map((c) => (
              <li key={c.name} className="border-l-2 border-line pl-4">
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-medium text-fg hover:text-accent transition-colors">
                    {c.name} ↗
                  </a>
                ) : (
                  <p className="font-medium text-fg">{c.name}</p>
                )}
                <p className="mt-0.5 font-mono text-[11px] text-dim">
                  {c.issuer} · {c.issued}
                  {c.expires ? ` ~ ${c.expires}` : ''}
                </p>
                <p className="mt-1 text-sm text-mute">{c.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
