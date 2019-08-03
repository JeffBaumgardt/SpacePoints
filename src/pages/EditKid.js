import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Button,
	DialogActions,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {getKid, updateKids} from 'lib/store'
import ProfileImage from 'components/ProfileImage'

const useStyles = makeStyles(theme => ({
	profileImage: {
		height: 60,
		width: 60
	},
}))

function EditKid({open, kidId, onClose}) {
	const classes = useStyles()
	const [values, setValues] = React.useState({
		name: '',
		image: '',
	})
	const [error, setError] = React.useState(null)

	React.useEffect(() => {
		const getKidInfo = async () => {
			const kidInfo = await getKid(kidId)
			setValues({name: kidInfo.name, image: kidInfo.image})
		}
		getKidInfo()
	}, [kidId])

	const handleNameChange = event => {
		setError(event.target.value.length === 0)
		setValues({...values, name: event.target.value})
	}

	return (
		<Dialog open={open} fullWidth maxWidth="xl" aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Edit Kid</DialogTitle>
			<DialogContent>
				<TextField
					id="kid-name"
					label="Name"
					value={values.name}
					placeholder="Jimmy"
					margin="normal"
					error={error}
					onChange={handleNameChange}
					required
					fullWidth
				/>

				<ProfileImage name={values.name} image={values.image} className={classes.profileImage} />
			</DialogContent>
			<DialogActions>
				<Button color="secondary" onClick={onClose}>
					Cancel
				</Button>
				<Button color="primary">Save</Button>
			</DialogActions>
		</Dialog>
	)
}

export default EditKid
