import React, { FC, useEffect, useState } from 'react'
import { setParent } from '../utils/treeNode';
import styles from './TreeView.module.scss'
import Toolbar from '../Toolbar/Toolbar';
import TreeNode from '../TreeNode/TreeNode';
import { SelectTreeViewItem } from '../types';
import { SelectTreeViewContext } from '../context/SelectTreeViewContext';

type Props = {
  placeholder: string;
  multiSelect?: boolean;
}

const TreeView: FC<Props> = ({ placeholder, multiSelect = false }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const treeViewContext = SelectTreeViewContext;

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.select}
        role='button'
        onClick={() => toggle()}
      >
        <div className={styles.select__title}>
          {placeholder}
        </div>
        <div className={styles.select__toggle}>
          {open ? 'Close' : 'Open'}
        </div>
      </div>
      {open && (
        <div className={styles.dropdown}>
          <Toolbar />
          <ul>
            {treeViewContext.treeViewItems.map((item => (
              <TreeNode lavel={0} key={item.value} node={item} />
            )))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TreeView