import React from 'react'
import Avatar from '@material-ui/core/Avatar'

function ProfileImage({image, name}) {
	if (image) {
		return <Avatar alt={name} src={image} />
	} else {
		return <Avatar>{name.subtring(0, 1)}</Avatar>
	}
}

export default ProfileImage
