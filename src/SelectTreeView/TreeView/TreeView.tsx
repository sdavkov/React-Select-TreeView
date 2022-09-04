import React, { FC } from 'react'
import styles from './TreeView.module.scss'
import Toolbar from '../Toolbar/Toolbar';
import TreeNode from '../TreeNode/TreeNode';
import { SelectTreeViewContext } from '../context/context';
import { CSSTransition } from 'react-transition-group';
import SelectedItem from '../SelectedItem/SelectedItem';
import { getLowLavelValue } from '../utils/treeNode';

type Props = {
  placeholder: string;
}

const TreeView: FC<Props> = ({ placeholder }) => {
  const { treeViewItems, selectedTreeViewItems, isOpen, setIsOpen, clearSelectedTreeViewItems } = React.useContext(SelectTreeViewContext);
  const nodeRef = React.useRef(null)

  function onClearSelectedTreeViewItems(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    clearSelectedTreeViewItems();
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.select}
        role='button'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.select__title}>
          {selectedTreeViewItems.length === 0 ?
            placeholder
            :
            selectedTreeViewItems.map(item => (
              <SelectedItem key={getLowLavelValue(item).value} item={item} />
            ))
          }
        </div>
        <div className={styles.select__toolbox}>
          {selectedTreeViewItems.length > 0 &&
            <div onClick={onClearSelectedTreeViewItems}>Clear</div>
          }
          <div className={styles.select__toggle}>
            {isOpen ? 'Close' : 'Open'}
          </div>
        </div>
      </div>
      <CSSTransition
        nodeRef={nodeRef}
        in={isOpen}
        timeout={200}
        unmountOnExit
        classNames={{
          enter: styles.enter,
          enterActive: styles.enter_active,
          exit: styles.exit,
          exitActive: styles.exit_active,
        }}>
        <div className={styles.dropdown} ref={nodeRef}>
          <Toolbar />
          <ul>
            {treeViewItems.map((item => (
              <TreeNode key={item.value} node={item} />
            )))}
          </ul>
        </div>
      </CSSTransition>
    </div>
  )
}

export default TreeView