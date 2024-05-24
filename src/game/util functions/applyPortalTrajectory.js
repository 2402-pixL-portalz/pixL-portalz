const applyPortalTrajectory = (enteringPortal, exitingPortal, item) => {
	// facing left
	if (enteringPortal.angle === 0) {
		// facing left
		if (exitingPortal.angle === 0) {
			item.setVelocity(-item.body.velocity.x, item.body.velocity.y);
		}
		// facing right
		// does nothing

		// facing up
		else if (exitingPortal.angle === 90) {
			item.setVelocity(-item.body.velocity.y, -item.body.velocity.x);
		}
		// facing down
		else if (exitingPortal.angle === -90) {
			item.setVelocity(item.body.velocity.y, item.body.velocity.x);
		}
	}

	// facing right
	else if (enteringPortal.angle === -180) {
		// facing left
		// does nothing

		// facing right
		if (exitingPortal.angle === -180) {
			item.setVelocity(-item.body.velocity.x, item.body.velocity.y);
		}

		// facing up
		else if (exitingPortal.angle === 90) {
			item.setVelocity(-item.body.velocity.y, item.body.velocity.x);
		}
		// facing down
		else if (exitingPortal.angle === -90) {
			item.setVelocity(item.body.velocity.y, -item.body.velocity.x);
		}
	}

	// facing up
	else if (enteringPortal.angle === 90) {
		// facing left
		if (exitingPortal.angle === 0) {
			item.setVelocity(-item.body.velocity.y, item.body.velocity.x);
		}
		// facing right
		else if (exitingPortal.angle === -180) {
			item.setVelocity(item.body.velocity.y, -item.body.velocity.x);
		}

		// facing up
		else if (exitingPortal.angle === 90) {
			item.setVelocity(item.body.velocity.x, -item.body.velocity.y);
		}
		// facing down
		// does nothing
	}

	// facing down
	else if (enteringPortal.angle === -90) {
		// facing left
		if (exitingPortal.angle === 0) {
			item.setVelocity(item.body.velocity.y, -item.body.velocity.x);
		}
		// facing right
		else if (exitingPortal.angle === -180) {
			item.setVelocity(-item.body.velocity.y, item.body.velocity.x);
		}
		// facing up
		// does nothing

		// facing down
		else if (exitingPortal.angle === -90) {
			item.setVelocity(item.body.velocity.x, -item.body.velocity.y);
		}
	}
};

export default applyPortalTrajectory;
