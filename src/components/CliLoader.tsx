import React, { useEffect, useState } from "react";
import { loaders, Loaders } from "../utils/constants";

type CliLoaderProps = {
	loaderName?: keyof Loaders; // Optional prop for selecting the loader
	speedMultiplier?: number; // Speed multiplier from 0 to 1
};

const CliLoader = ({
	loaderName = "pipe",
	speedMultiplier = 0.5,
}: CliLoaderProps): React.JSX.Element => {
	const [currentFrame, setCurrentFrame] = useState(0);
	const loader = loaders[loaderName];

	useEffect(() => {
		setCurrentFrame(0); // Reset the frame on loader change

		// Adjust interval speed based on speedMultiplier (0 - slowest, 1 - fastest)
		const intervalDuration = loader!.interval / (0.5 + speedMultiplier / 2); // Maps 0-1 to 1-2x speed

		const interval = setInterval(() => {
			setCurrentFrame(
				(prevFrame) => (prevFrame + 1) % loader!.frames.length
			);
		}, intervalDuration);

		return () => clearInterval(interval);
	}, [loader, speedMultiplier]);

	// Render the current frame within a fixed-width container
	return (
		<div
			style={{
				width: "100%",
				whiteSpace: "pre",
			}}
		>
			{loader!.frames[currentFrame]}
		</div>
	);
};

export default CliLoader;
