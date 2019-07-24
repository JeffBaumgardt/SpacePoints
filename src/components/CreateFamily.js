import React from 'react'
import PropTypes from 'prop-types'
import * as store from 'lib/store'
import {useUser} from 'context/user'
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogContentText,
	TextField,
	DialogActions,
	Button,
	Snackbar,
	SnackbarContent,
	IconButton,
} from '@material-ui/core'
import {Error, Close} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import clsx from 'clsx'

const useErrorStyles = makeStyles(theme => ({
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
}))

function ErrorMessage({className, message, onClose, ...other}) {
	const classes = useErrorStyles()

	return (
		<SnackbarContent
			className={clsx(classes.error, className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classes.message}>
					<Error className={clsx(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
					<Close className={classes.icon} />
				</IconButton>,
			]}
			{...other}
		/>
	)
}

ErrorMessage.propTypes = {
	className: PropTypes.string,
	message: PropTypes.node,
	onClose: PropTypes.func,
}

const useFamilyStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(1),
	},
}))

function CreateFamily({completeFamily}) {
	const {id} = useUser()
	const classes = useFamilyStyles()
	const [error, setError] = React.useState(null)
	const [name, setName] = React.useState('')

	const makeFamily = async () => {
		if (!name || name.length === 0) {
			setError('You must enter a family name to continue')
		}
		const familyId = await store.createFamily(name)
		const addSelfToFamily = await store.addAdultToFamily(familyId, id)

		if (addSelfToFamily === 'success') {
			setError(null)
			setName('')
			completeFamily(familyId)
		} else {
			setError('There was a problem creating your family')
		}
	}

	const updateName = event => {
		setName(event.target.value)
	}

	const handleClose = () => {
		setError(null)
	}

	return (
		<>
			<Dialog open aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Create a new family</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To continue, you need to create a new family. Please enter your family name below.
					</DialogContentText>
					<TextField
						autoFocus
						onChange={updateName}
						margin="dense"
						id="familyName"
						label="Family Name"
						type="text"
						placeholder="Smith"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={makeFamily} color="primary" disabled={!error}>
						Create
					</Button>
				</DialogActions>
			</Dialog>
			{error ? (
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={error}
					autoHideDuration={6000}
					onClose={handleClose}
				>
					<ErrorMessage message={error} onClose={handleClose} className={classes.margin} />
				</Snackbar>
			) : null}
		</>
	)
}

CreateFamily.propTypes = {
	completeFamily: PropTypes.func.isRequired,
}

export default CreateFamily
