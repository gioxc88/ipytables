// Copyright (c)
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../css/widget.css';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.datatables.css';

export class TableModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: TableModel.model_name,
      _model_module: TableModel.model_module,
      _model_module_version: TableModel.model_module_version,
      _view_name: TableModel.view_name,
      _view_module: TableModel.view_module,
      _view_module_version: TableModel.view_module_version,
      value: 'Hello World',
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'TableModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'TableView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class TableView extends DOMWidgetView {
  private _table: HTMLTableElement;
  // private _data: HTMLDivElement;
  render() {
    this._table = document.createElement('table');
    this._table.setAttribute('id', 'table_id');
    this._table.setAttribute('class', 'display');
    this._table.setAttribute('width', '100%');
    this.el.appendChild(this._table);

    // const dataSet = [
    //   [
    //     'Tiger Nixon',
    //     'System Architect',
    //     'Edinburgh',
    //     '5421',
    //     '2011/04/25',
    //     '$320,800',
    //   ],
    //   [
    //     'Garrett Winters',
    //     'Accountant',
    //     'Tokyo',
    //     '8422',
    //     '2011/07/25',
    //     '$170,750',
    //   ],
    //   [
    //     'Ashton Cox',
    //     'Junior Technical Author',
    //     'San Francisco',
    //     '1562',
    //     '2009/01/12',
    //     '$86,000',
    //   ],
    //   [
    //     'Cedric Kelly',
    //     'Senior Javascript Developer',
    //     'Edinburgh',
    //     '6224',
    //     '2012/03/29',
    //     '$433,060',
    //   ],
    // ];
    //
    // const cols = [
    //   { title: 'Name' },
    //   { title: 'Position' },
    //   { title: 'Office' },
    //   { title: 'Extn.' },
    //   { title: 'Start date' },
    //   { title: 'Salary' },
    // ];
    const data = this.model.get('data');

    $(() => {
      $('#table_id').DataTable({
        data: JSON.parse(data['data']),
        columns: JSON.parse(data['columns']),
      });
    });
  }
}
