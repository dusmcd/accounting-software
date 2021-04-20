import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Header() {
    return (
            <Menu>
                <Menu.Item>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/bills">Bills</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/invoices">Invoices</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/journals">Journal Entries</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/contacts">Contacts</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/coa">Chart of Accounts</Link>
                </Menu.Item>
            </Menu>
    )
}

export default Header;