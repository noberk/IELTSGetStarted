

import * as React from "react";
import { Menu, Icon, Input, Dropdown } from "antd";
import { ClickParam } from "../../../../node_modules/antd/lib/menu/index";
import Weather from "../weather/weather";
import { StyleAntiCollision } from "../../../tools/stylePrefix";
import { IntlProvider, FormattedMessage } from 'react-intl';

import './index.less';
import { RouteLinkAddress } from "../../../tools/config";


const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
    </Menu>
);

const navigationInfo = [
    { key: "home", icon: "home", name: "Home" },
    { key: "Email", icon: "mail", name: "Email" },
    { key: "app", icon: "appstore", name: "App" },
    { key: "tool", icon: "tool", name: "Setting" },
    { key: "alipay", icon: "github", name: "Github" },
    { key: "vacobulary", icon: "heart", name: "Vacobulary", userStyle: { color: "purple" } },
]

const Search = Input.Search;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const s = new StyleAntiCollision('header');
class Header extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            current: 'home',
            name: 'Eric',
            unreadCount: 1000,
            dropDownVisible: false,
        }

    }
    onChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        console.info(value.target.value)
        this.setState({ dropDownVisible: true })
    }


    handleClick = (e: ClickParam) => {
        if (e.key == 'home') {
            location.href = '/';
        }
        if (e.key === "vacobulary") {
            let item = RouteLinkAddress.find(p => p.address === "vacobulary");
            if (item !== undefined) {
                location.href = `/${item.path}`;
            }else{
                location.href = "/error"
            }
        }
        this.setState({ current: e.key });
    }
    render() {

        return (
            <div className={s.suffix('header_Wrapper')}>

                <div className={s.suffix('header_nav')}>
                    <div >
                        <Weather />
                        <div className={s.suffix('nav')}>
                            <span><a href="/#/article">文章</a></span>
                        </div>

                    </div>
                    <div>
                        <Dropdown overlay={menu} placement="bottomLeft">
                            <Search placeholder="檢索" onChange={this.onChange} className={s.suffix('search')} />
                        </Dropdown>
                        <a href="/#/login">登入</a>
                        <a href="/#/register">註冊</a>

                    </div>
                </div>
                <Menu
                    style={{ lineHeight: '80px' }}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal">
                    {navigationInfo.map(val => <Menu.Item key={val.key}> <Icon style={val.userStyle} type={val.icon} />{val.name}</Menu.Item>)}
                </Menu>
            </div>
        );
    }
}

export default Header;