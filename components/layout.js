import styles from './layout.module.css'
import Navbar from './navbar'
import Sparkles from './sparkles'
import {easeInOut, motion} from 'framer-motion'

const Layout = ({ className, children }) => {
  return (
    <>
      <motion.div
        className={styles.enterFader}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ ease: easeInOut}}
      />
      <Sparkles />
      <Navbar className={className} />
      <main className={`${styles.container} ${className}`}>{children}</main>
    </>
  )
}

export default Layout