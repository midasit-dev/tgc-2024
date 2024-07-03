import * as React from 'react';
import { motion } from 'framer-motion';

function App() {
	const [slideIndex, setSlideIndex] = React.useState(0);

	const changeRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const handleOnChangeSlide = () => {
			if (changeRef.current) {
				const curSlideIndex = Number(changeRef.current.innerHTML); // 0, 1
				setSlideIndex(curSlideIndex);
			}
		}

		document.getElementById('change-slide')?.addEventListener('onChangeSlide', handleOnChangeSlide);

		return () => {
			document.getElementById('change-slide')?.removeEventListener('onChangeSlide', handleOnChangeSlide);
		}
	}, []);

  return (
    <div style={wrapper}>
      <div id="change-slide" ref={changeRef} style={{ display: "none" }} />
      <div style={icon}>
        {slideIndex === 0 && (
          <motion.div
            initial={{ opacity: 0, rotate: 0, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 720, scale: [0.7, 1.2, 1] }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              duration: 2,
            }}
          >
            <img src="./ico150_plugins_seismichazardmap.svg" alt="" />
          </motion.div>
        )}

        {slideIndex === 1 && (
          <motion.div
            initial={{ opacity: 0, rotate: 0, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 720, scale: [0.7, 1.2, 1] }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              duration: 2,
            }}
          >
            <img src="./ico150_plugins_tunnellining.svg" alt="" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;

const wrapper = {
	position: 'relative',
	zIndex: 3,
	opacity: .6
} as React.CSSProperties;

const icon = {
	position: 'absolute',
	top: 50,
  left: '50%',
  transform: 'translate(-50%, 0%)',
	width: 150,
	height: 150,
} as React.CSSProperties;