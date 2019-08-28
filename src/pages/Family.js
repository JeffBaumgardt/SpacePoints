import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {
	Grid,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	ButtonGroup,
} from '@material-ui/core'
import {Edit, Delete} from '@material-ui/icons'
import {number} from 'utils'
import ProfileImage from 'components/ProfileImage'
import EditKid from './EditKid'
import {getFamily} from 'lib/store'

const useStyles = makeStyles(theme => ({
	familyContianer: {
		marginTop: theme.spacing(2),
	},
	tableContainer: {
		tableLayout: 'fixed',
	},
}))

function ShowDialog({type, kidId, open, onClose}) {
	if (type === 'edit') {
		return (
			<EditKid open={open} kidId={kidId} onClose={onClose} />
		)
	} else if (type === 'delete') {
		return (
			<p>delete</p>
		)
	} else{
		return null
	}
}

function Family({id, kids, adults}) {
	const classes = useStyles()
	const [dialogState, setDialogState] = React.useState(false)
	const [dialogType, setDialogType] = React.useState('')
	const [selectedKid, setSelectedKid] = React.useState('')

	const editKid = kidId => {
		setDialogType('edit')
		setSelectedKid(kidId)
		setDialogState(true)
	}

	const deleteKid = kidId => {
		setDialogType('delete')
		setSelectedKid(kidId)
	}

	const closeDialog = wasUpdated => {
		setDialogType('')
		setSelectedKid('')
		setDialogState(false)

		if (wasUpdated) {
			console.log('was updated', id)
			getFamily(id)
		}
	}

	return (
		<>
			<Grid container justify="center" className={classes.familyContianer}>
				<Grid item container xs={12}>
					<Table className={classes.tableContainer}>
						<TableHead>
							<TableRow>
								<TableCell align="left"></TableCell>
								<TableCell>Name</TableCell>
								<TableCell align="right">Points</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{kids.map(kid => {
								return (
									<TableRow key={kid.id}>
										<TableCell align="left">
											<ProfileImage name={kid.name} image={kid.image} />
										</TableCell>
										<TableCell>{kid.name}</TableCell>
										<TableCell align="right">{number(kid.points)}</TableCell>
										<TableCell>
											<ButtonGroup variant="contained" fullWidth={false} size="small" aria-label="actions">
												<IconButton onClick={() => editKid(kid.id)}>
													<Edit />
												</IconButton>
												<IconButton onClick={() => deleteKid(kid.id)} color="secondary">
													<Delete />
												</IconButton>
											</ButtonGroup>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</Grid>
			</Grid>
			<ShowDialog open={dialogState} type={dialogType} kidId={selectedKid} onClose={closeDialog}/>
		</>
	)
}

export default Family
