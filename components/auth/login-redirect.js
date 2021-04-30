import Router from 'next/router';
import React, {Component} from 'react';

import {redirectTo} from '../utils/url-helpers';

export default class RedirectToLogin extends Component {
    componentDidMount() {
        window.location.assign(redirectTo(Router.pathname));
    }

    render() {
        return <div>{'Signing you in...'}</div>;
    }
}
