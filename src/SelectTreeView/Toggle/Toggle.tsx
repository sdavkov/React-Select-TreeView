import React, { FC } from 'react'
import styles from './Toggle.module.scss'

type Props = {
	expanded: boolean;
	isLeaf: boolean;
	onToggle: ()=> void;
}

const Toggle: FC<Props> = ({expanded, isLeaf, onToggle}) => {

	const toggleCx = [styles.toggle, expanded && styles.expanded, !expanded && styles.collapsed, isLeaf && styles.hidden].filter(Boolean).join(' ')

	return (
		<div onClick={onToggle} className={toggleCx}></div>
	)
}

export default Toggle