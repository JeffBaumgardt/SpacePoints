import React from 'react'
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import ProfileImage from 'components/ProfileImage'
import {useKid} from 'lib/useKid'

const useStyles = makeStyles(theme => ({
	profileContainer: {
		marginTop: theme.spacing(2),
	},
	profileImage: {
		height: 128,
		width: 128,
	},
}))

function Kid({match}) {
	const kidId = match.params.id
	const classes = useStyles()
	const kid = useKid(kidId)

	return kid ? (
		<Grid container justify="center" className={classes.profileContainer}>
			<Grid item container justify="center" xs={12}>
				<ProfileImage name={kid.name} image={kid.image} className={classes.profileImage} />
			</Grid>
		</Grid>
	) : null
}

export default Kid
