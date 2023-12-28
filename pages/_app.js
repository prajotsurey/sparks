import { motion,AnimatePresence} from 'framer-motion'
import '../styles.css'
import { Inter } from "next/font/google";
import Layout from "../components/layout";
import gsap from 'gsap-trial';
import { DrawSVGPlugin } from 'gsap-trial/all';
import { useRouter } from 'next/router';

gsap.registerPlugin(DrawSVGPlugin)
const inter = Inter({
  subsets: ["latin"],
});

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <AnimatePresence mode='wait'>
    <motion.div key={router.pathname}>
      <Layout className={inter.className}>
        <Component {...pageProps} />
      </Layout>
      </motion.div>
    </AnimatePresence>
  );
};

export default MyApp;
