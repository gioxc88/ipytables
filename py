import json

from ipywidgets import DOMWidget, ValueWidget, register
from traitlets import Unicode, Bool, validate, TraitError, Dict

from ._frontend import module_name, module_version


@register
class ITable(DOMWidget, ValueWidget):
    _model_name = Unicode('TableModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)

    _view_name = Unicode('TableView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    data = Dict().tag(sync=True)

    def __init__(self, df, **kwargs):
        data = self.parse_df(df)
        super().__init__(data=data, **kwargs)

    def parse_df(self, df, **kwargs):
        double_precision = kwargs.pop('double_precision', 4)
        index = kwargs.pop('index', True)
        if index:
            df = df.reset_index()

        dfj = df.to_json(
            orient='records',
            double_precision=double_precision,
            # index=index,
            **kwargs
        )

        cols = json.dumps([{"data": col, "title": col} for col in df])

        return {'data': dfj, 'columns': cols}


