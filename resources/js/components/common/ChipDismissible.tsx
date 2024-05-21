import React from 'react';
import { Chip } from '@material-tailwind/react';

interface IChipDismissibleProps {
  open: boolean;
  value: React.ReactNode;
  onClose: () => void;
}

const ChipDismissible: React.FC<IChipDismissibleProps> = ({
  open,
  value,
  onClose,
}) => {
  return (
    <>
      <Chip
        open={open}
        value={value}
        className="bg-black rounded-[9px] px-[50px] py-[10px] h-min text-white font-semibold font-poppins text-sm"
        onClose={onClose}
      />
    </>
  );
};

export default ChipDismissible;
