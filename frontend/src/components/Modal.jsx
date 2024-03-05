const Modal = ({ isOpen, onClose, children }) => {
	return (
		<>
			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="fixed inset-0 bg-black opacity-50"></div>
					<div className="relative mx-auto mt-10 p-4 md:w-[50%] lg:w-[40%] xl:w-[30%] bg-white rounded-lg z-10 text-center">
						<button
							className="absolute top-0 right-0 text-black font-semibold hover:text-gray-700 focus:outline-none m-2"
							onClick={onClose}
						>
							X
						</button>
						{children}
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
