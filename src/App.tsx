import React from 'react';
import './App.css';
import SelectTreeView from './SelectTreeView';
import { SelectTreeViewItem } from './SelectTreeView/types';



const items: SelectTreeViewItem[] = [
  {
    "label": "Agro Owner",
    "value": "103",
    "children": [
      {
        "label": "Agro Owner",
        "value": "101",
        children: [{
          "label": "пгппррпл",
          "value": "87",
        }]
      }
    ]
  },
  {
    "label": "Иван Иванович Иванов",
    "value": "104",
  },
  {
    "label": "пгппррпл",
    "value": "87",
    "children": [
      {
        "label": "плрплпл",
        "value": "85"
      }
    ]
  },
  {
    "label": "рдддрдло",
    "value": "88",
    "children": [
      {
        "label": "глолол",
        "value": "86"
      }
    ]
  },
  {
    "label": "Торговая",
    "value": "89",
    "children": [
      {
        "label": "Торг",
        "value": "87"
      }
    ]
  },
  {
    "label": "АО \"Оригинал\"",
    "value": "86",
    "children": []
  },
  {
    "label": "test_ur1",
    "value": "91",
    "children": [
      {
        "label": "test_ur1",
        "value": "89"
      }
    ]
  },
  {
    "label": "test11",
    "value": "92",
    "children": [
      {
        "label": "test11",
        "value": "90"
      },
      {
        "label": "test12",
        "value": "91"
      },
      {
        "label": "test13",
        "value": "92"
      }
    ]
  },
  {
    "label": "ООО \"Тестирование\"",
    "value": "93",
    "children": [
      {
        "label": "Тестовый головной офис",
        "value": "95"
      }
    ]
  },
  {
    "label": "Кирово-Чепецкий завод \"АГРОХИМИКАТ\"",
    "value": "80",
    "children": [
      {
        "label": "Место для импорта",
        "value": "71"
      },
      {
        "label": "Место для перемещения",
        "value": "96"
      }
    ]
  },
  {
    "label": "Закрытое Акционерное Общество \"ФАРМФИРМА \"СОТЕКС\"",
    "value": "95",
    "children": [
      {
        "label": "Головной офис",
        "value": "98"
      }
    ]
  },
  {
    "label": "ОАО АААп",
    "value": "97",
    "children": [
      {
        "label": "ААА",
        "value": "100"
      }
    ]
  },
  {
    "label": "AO Original Group",
    "value": "77",
    "children": [
      {
        "label": "AO Original Group",
        "value": "60"
      },
      {
        "label": "АО \"Оригинал\"",
        "value": "82"
      }
    ]
  },
  {
    "label": "gfdg",
    "value": "82",
    "children": [
      {
        "label": "555555555",
        "value": "83"
      },
      {
        "label": "Наименование 333333",
        "value": "73"
      }
    ]
  },
  {
    "label": "Тестовое Лицо",
    "value": "83",
    "children": [
      {
        "label": "Тестовое Место",
        "value": "75"
      }
    ]
  },
  {
    "label": "7751054972",
    "value": "84",
    "children": [
      {
        "label": "7751054972",
        "value": "76"
      }
    ]
  },
  {
    "label": "ОАО ААА",
    "value": "96",
    "children": [
      {
        "label": "ААА",
        "value": "99"
      }
    ]
  }
];

function App() {
  return (
    <div className="container">
      <SelectTreeView
        multiselect={false}
        placeholder='Select Tree View'
        items={items}
      />
    </div>
  );
}

export default App;
