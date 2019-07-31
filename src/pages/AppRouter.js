import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import BottomNav from 'components/BottomNav'
import Home from './Home'
import Kid from './Kid'

const useStyles = makeStyles(theme => ({
	bottomNav: {
		position: 'fixed',
		bottom: 0,
		width: '100%',
	},
}))

function AppRouter({familyInfo}) {
	const classes = useStyles()

	return (
		<>
			<Container maxWidth="sm">
				<Switch>
					<Route exact path="/" render={routeProps => (
						<Home kids={familyInfo.kids} {...routeProps} />
					)} />
					<Route exact path="/family" children={<div>Hello Family</div>} />
					<Route exact path="/rewards" children={<div>Hello Rewards</div>} />
					<Route exact path="/kid/new" children={<div>New Kid</div>} />
					<Route path="/kid/:id" component={Kid} />
				</Switch>
			</Container>
			<BottomNav className={classes.bottomNav} />
		</>
	)
}

export default AppRouter
