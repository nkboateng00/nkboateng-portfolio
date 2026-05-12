import { FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-black/10 px-5 py-8 dark:border-white/10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 text-center">
        <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
          © 2025 nkboateng
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/nkboateng00"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-neutral-500 transition hover:text-accent dark:text-neutral-400 dark:hover:text-accent-dark"
          >
            <FiGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/nkboateng"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-neutral-500 transition hover:text-accent dark:text-neutral-400 dark:hover:text-accent-dark"
          >
            <FiLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
