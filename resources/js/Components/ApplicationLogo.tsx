import { SVGAttributes } from 'react'

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
  return (
    <img
      {...props}
      src="/FindHire.png" // Make sure the image is in the public folder
      style={{ width: '7.5rem', height: '7.5rem' }}
      alt="Application Logo"
    />
  )
}
