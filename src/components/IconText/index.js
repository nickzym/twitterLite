import React, { Component } from 'react';
import { Icon } from 'antd';

class IconText extends Component {
    render() {
        const { type, text, iconPos } = this.props;
        return(
            <span>
                {
                    iconPos === 'right' ?
                    <div>
                        {text}
                        <Icon type={type} style={{ marginLeft: 8, color: '#1890ff' }}/>
                    </div> :
                    <div>
                        <Icon type={type} style={{ marginRight: 8 }}/>
                        {text}
                    </div>

                }
            </span>
        );
    }
}

export default IconText;
