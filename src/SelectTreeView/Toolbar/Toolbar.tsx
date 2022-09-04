import React, { useContext } from 'react'
import { SelectTreeViewContext } from '../context/context'
import styles from './Toolbar.module.scss'

const Toolbar = () => {

 const { collapseAllTreeNodes, expandAllTreeNodes } = useContext(SelectTreeViewContext)

  return (
	<div className={styles.toolbar}>
		<div className={styles.item} role='button' onClick={expandAllTreeNodes}>Развернуть все</div>
		<div className={styles.item} role='button' onClick={collapseAllTreeNodes}>Свернуть все</div>
	</div>
  )
}

export default Toolbar