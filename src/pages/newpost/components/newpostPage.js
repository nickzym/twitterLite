import React,{Component} from 'react';
import { Tabs } from 'antd';
import NormalTwitte from './NormalTwitte/index';
import PremiumTwitte from './PremiumTwitte/index';
import './style.less';

const TabPane = Tabs.TabPane;

class NewpostPage extends Component {
  render() {
    const clsPrefix = 'twl-newpost';
    return (
        <div className={`${clsPrefix}--container`}>
            <h2>Create a new post : )</h2>
            <hr />
            <div className="card-container">
                <Tabs type="card">
                  <TabPane tab="Normal Twitte" key="1">
                    <NormalTwitte />
                  </TabPane>
                  <TabPane tab="Restaurant Share" key="2">
                    <PremiumTwitte />
                  </TabPane>
                </Tabs>
            </div>
        </div>
    );
  }
}

export default NewpostPage;
