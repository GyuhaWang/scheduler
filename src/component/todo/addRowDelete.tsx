'use client';
import ClearIcon from '@mui/icons-material/Clear';
const AddRowDeleteButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button
			className="hover:scale-75 transition-all"
			aria-label="delete additional information"
			onClick={onClick}>
			{' '}
			<ClearIcon
				fontSize="small"
				color="error"
			/>
		</button>
	);
};

export default AddRowDeleteButton;
