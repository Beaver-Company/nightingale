import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import { FormProps } from 'antd/lib/form';
import _ from 'lodash';
import ModalControl from '@cpts/ModalControl';

interface Props {
  name: string,
  title: string,
  visible: boolean,
  onOk: (values: any) => void,
  onCancel: () => void,
  destroy: () => void,
}

const FormItem = Form.Item;

class ModifyModal extends Component<Props & FormProps> {
  static defaultProps = {
    title: '',
    visible: true,
    onOk: _.noop,
    onCancel: _.noop,
    destroy: _.noop,
  };

  handleOk = () => {
    this.props.form!.validateFields((err, values) => {
      if (!err) {
        this.props.onOk(values);
        this.props.destroy();
      }
    });
  }

  handleCancel = () => {
    this.props.destroy();
  }

  render() {
    const { title, visible } = this.props;
    const { getFieldDecorator } = this.props.form!;

    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form layout="vertical" onSubmit={(e) => {
          e.preventDefault();
          this.handleOk();
        }}>
          <FormItem label="名称">
            {getFieldDecorator('name', {
              initialValue: this.props.name,
              rules: [{ required: true, message: '请填写大盘名称!' }],
            })(
              <Input />,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default ModalControl(Form.create()(ModifyModal));
