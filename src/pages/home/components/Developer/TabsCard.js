import React,{Component} from 'react';
import Card from 'antd/lib/card';
import 'antd/lib/card/style/css';
import Timeline from 'antd/lib/timeline';
import Avatar from 'antd/lib/avatar';
import 'antd/lib/timeline/style/css';
import 'antd/lib/avatar/style/css';

const tabList = [{
  key: 'Education',
  tab: 'Education',
}, {
  key: 'Work',
  tab: 'Work',
}, {
  key: 'Project',
  tab: 'Project',
}];

const contentList = {
  Education: <Timeline>
  <Timeline.Item><Avatar size="small" src="https://upload.wikimedia.org/wikipedia/en/6/6c/UESTC_xiaohui.png"/><b>  Univ of Elec Sci & Tech of China  </b>2012-09-01<p>B.Eng Electronic Science and Technology</p></Timeline.Item>
  <Timeline.Item><Avatar size="small" src="https://upload.wikimedia.org/wikipedia/commons/7/74/%E7%BE%A9%E5%AE%88%E5%A4%A7%E5%AD%B8%E6%A0%A1%E5%BE%BD.jpg"/><b>  I-Shou Univeristy  </b>2014-02-01<p>B.Eng Electronic Science and Technology</p></Timeline.Item>
  <Timeline.Item><Avatar size="small" src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/University_of_Southern_California_seal.svg/360px-University_of_Southern_California_seal.svg.png"/><b>University of Southern California  </b>2016-09-01<p>  M.S Computer Science</p></Timeline.Item>
  </Timeline>,
  Work: <Timeline>
  <Timeline.Item><Avatar size="small" src="https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Sohu_logo.png/320px-Sohu_logo.png"/><b>  Sohu.Com Inc, Sohu KuaiZhan  </b>2017-12-20<p>Software Development Engineer(Front End Developer)</p></Timeline.Item>
  <Timeline.Item><Avatar size="small" src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"/><b>  Google  </b>2018-06-01<p>Software Development Engineer</p></Timeline.Item>
  </Timeline>,
  Project: <Timeline>
  <Timeline.Item><Avatar size="small" src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Twitter_bird_logo_2012.svg/200px-Twitter_bird_logo_2012.svg.png"/><b>  TwitterLite social network app  </b>2018-3-25<p>Personal Web Project based on React/Redux/Webpack/Koa2</p></Timeline.Item>
  </Timeline>,
};


class TabsCard extends Component {
  state = {
    key: 'Education',
    noTitleKey: 'Education',
  }
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  }
  render() {
    return (
      <div>
          <Card
            style={{ width: '100%' }}
            title="Experience"
            tabList={tabList}
            onTabChange={(key) => { this.onTabChange(key, 'key'); }}
          >
            {contentList[this.state.key]}
          </Card>
      </div>
    );
  }
}

export default TabsCard;
