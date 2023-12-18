import React, { memo, useEffect, useState } from 'react';
import { Checkbox, Switch, Slider } from './styled';

interface SwitchSliderProps {
	action: () => void;
	checkedStatus?: boolean;
}

export const SwitchSlider = memo(({ action, checkedStatus }: SwitchSliderProps) => {
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		setChecked(checkedStatus);
	}, [checkedStatus]);

	return (
		<Switch>
			<Checkbox
				type={'checkbox'}
				checked={checked}
				onChange={() => {
					setChecked(!checked);
				}}
			/>
			<Slider onClick={action} checkedstatus={checked.toString()}></Slider>
		</Switch>
	);
});
