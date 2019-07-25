import React from 'react'
import {Switch, Route, NavLink} from 'react-router-dom'
import {Container, BottomNavigation, BottomNavigationAction} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {GroupAdd, Cake, Home} from '@material-ui/icons'
import JoinFamily from 'components/JoinFamily'

const useStyles = makeStyles(theme => ({
	bottomNav: {
		position: 'fixed',
		bottom: 0,
		width: '100%',
	},
}))

const ButtonLink = React.forwardRef((itemProps, ref) => <NavLink {...itemProps} innerRef={ref} />)

function HomeLanding({familyInfo}) {
	const classes = useStyles()
	const [family, setFamily] = React.useState(null)

	React.useEffect(() => {
		if (familyInfo) {
			setFamily(familyInfo.id)
		}
	}, [setFamily, familyInfo])

	return (
		<Container maxWidth="sm">
			<Switch>
				<Route exact path="/" children={<div>Hello Home</div>} />
				<Route exact path="/family" children={<div>Hello Family</div>} />
				<Route exact path="/rewards" children={<div>Hello Rewards</div>} />
			</Switch>
			<BottomNavigation showLabels className={classes.bottomNav}>
				<BottomNavigationAction
					label="Family"
					icon={<GroupAdd />}
					to="/family"
					component={ButtonLink}
				/>
				<BottomNavigationAction label="Home" icon={<Home />} to="/" component={ButtonLink} />
				<BottomNavigationAction
					label="Rewards"
					icon={<Cake />}
					to="/rewards"
					component={ButtonLink}
				/>
			</BottomNavigation>
			{family ? null : <JoinFamily completeFamily={newFamily => setFamily(newFamily)} />}
		</Container>
	)
}

export default HomeLanding
