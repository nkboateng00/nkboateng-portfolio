import { Children, Fragment, useRef } from 'react'
import { useInViewOnce } from '../../lib/hooks'

/*
  Reveal: a block that materialises as it scrolls into view.
  Words: a line of text whose words rise out of their own masks, one after another.
  Lines: like Words, but each child is a whole line (for headings that mix text and images).
  All three only toggle [data-in]; the motion lives in index.css.
*/
export function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null)
  const inView = useInViewOnce(ref)
  return (
    <Tag
      ref={ref}
      data-in={inView || undefined}
      className={`reveal ${className}`}
      style={{ '--d': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Words({ as: Tag = 'span', text, delay = 0, stagger = 35, className = '', ...rest }) {
  const ref = useRef(null)
  const inView = useInViewOnce(ref)
  const words = text.split(' ')
  return (
    <Tag
      ref={ref}
      data-in={inView || undefined}
      className={className}
      style={{ '--d': `${delay}ms`, '--stagger': `${stagger}ms` }}
      {...rest}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="mask">
            <span className="mask-in" style={{ '--i': i }}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}

export function Lines({ as: Tag = 'div', delay = 0, stagger = 110, className = '', children, ...rest }) {
  const ref = useRef(null)
  const inView = useInViewOnce(ref)
  return (
    <Tag
      ref={ref}
      data-in={inView || undefined}
      className={className}
      style={{ '--d': `${delay}ms`, '--stagger': `${stagger}ms` }}
      {...rest}
    >
      {Children.toArray(children).map((line, i) => (
        <span key={i} className="mask block">
          <span className="mask-in block" style={{ '--i': i }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}

// An image that unmasks as it arrives: the frame opens from an inset to full
// size while the picture settles from a slight zoom.
export function ImageReveal({ src, alt = '', className = '', imgClassName = '', ...rest }) {
  const ref = useRef(null)
  const inView = useInViewOnce(ref, { margin: '0px 0px -8% 0px' })
  return (
    <div ref={ref} data-in={inView || undefined} className={`clip-reveal ${className}`} {...rest}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className={imgClassName} />
    </div>
  )
}
