import React, {Component} from 'react';

import auth0 from '../lib/auth0';
import {fetchUser} from '../lib/user';
import {redirectTo} from '../utils/url-helpers';
import {ADMIN_EMAILS} from '../enums/admin-emails';

import RedirectToLogin from './login-redirect';

export default InnerComponent => class Authenticated extends Component {
		static async getInitialProps(ctx) {
			if (!ctx.req) {
				const user = await fetchUser();

				return {
					user
				};
			}

			const session = await auth0.getSession(ctx.req);

			if (!session || !session.user) {
				ctx.res.writeHead(302, {
					Location: redirectTo(ctx.req.url)
				});
				ctx.res.end();

				return null;
			}

			return {user: session.user};
		}

		render() {
			if (!this.props.user) {
				return <RedirectToLogin />;
			}

            if (!ADMIN_EMAILS.includes(this.props.user.email)) {
                return <div>{'Unauthorized.'}</div>
            }

			return (
				<div>{<InnerComponent {...this.props} user={this.props.user} />}</div>
			);
		}
	};
