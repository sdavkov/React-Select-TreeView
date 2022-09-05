import React, { FC, useEffect } from 'react'
import styles from './TreeView.module.scss'
import Toolbar from '../Toolbar/Toolbar';
import TreeNode from '../TreeNode/TreeNode';
import { SelectTreeViewContext } from '../context/context';
import { CSSTransition } from 'react-transition-group';
import SelectedItem from '../SelectedItem/SelectedItem';

type Props = {
  placeholder: string;
}

const TreeView: FC<Props> = ({ placeholder }) => {
  const { treeViewItems, selectedTreeViewItems, isOpen, setIsOpen, clearSelectedTreeViewItems } = React.useContext(SelectTreeViewContext);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  function onClearSelectedTreeViewItems(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    clearSelectedTreeViewItems();
  }

  useEffect(() => {
    
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, setIsOpen])

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
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
              <SelectedItem key={item.value} item={item} />
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
        nodeRef={dropdownRef}
        in={isOpen}
        timeout={200}
        unmountOnExit
        classNames={{
          enter: styles.enter,
          enterActive: styles.enter_active,
          exit: styles.exit,
          exitActive: styles.exit_active,
        }}>
        <div className={styles.dropdown} ref={dropdownRef}>
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