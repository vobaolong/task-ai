/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Head component for the app
 */

import { Helmet } from 'react-helmet'

interface HeadProps {
  title: string
}

const Head: React.FC<HeadProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default Head
