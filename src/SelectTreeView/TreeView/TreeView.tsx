import React, { FC, useState } from 'react'
import styles from './TreeView.module.scss'
import Toolbar from '../Toolbar/Toolbar';
import TreeNode from '../TreeNode/TreeNode';
import { SelectTreeViewContext } from '../context/context';

type Props = {
  placeholder: string;
}

const TreeView: FC<Props> = ({ placeholder }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const { treeViewItems, selectedTreeViewItems } = React.useContext(SelectTreeViewContext);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.select}
        role='button'
        onClick={() => toggle()}
      >
        <div className={styles.select__title}>
          {selectedTreeViewItems.length === 0 ? placeholder :
            selectedTreeViewItems.map(item => (
              <div>{item.label}</div>
            ))
          }
        </div>
        <div className={styles.select__toggle}>
          {open ? 'Close' : 'Open'}
        </div>
      </div>
      {open && (
        <div className={styles.dropdown}>
          <Toolbar />
          <ul>
            {treeViewItems.map((item => (
              <TreeNode key={item.value} node={item} />
            )))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TreeView