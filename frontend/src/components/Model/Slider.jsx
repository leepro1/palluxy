import PropTypes from 'prop-types';
import { useModelPositionStore } from '@store/memorySpace';

const Slider = ({ type, coordinate }) => {
  const position = useModelPositionStore((state) => state.position);
  const rotation = useModelPositionStore((state) => state.rotation);
  const updatePosition = useModelPositionStore((state) => state.updatePosition);
  const updateRotation = useModelPositionStore((state) => state.updateRotation);

  const updateValue = (event) => {
    if (type == 'position') {
      updatePosition({ [coordinate]: event.currentTarget.value });
    }
    if (type == 'rotation') {
      updateRotation({ [coordinate]: event.currentTarget.value });
    }
  };

  return (
    <input
      type="range"
      min={type === 'position' ? -3 : -5}
      max={type === 'position' ? 3 : 5}
      step={type === 'position' ? 0.2 : 0.01}
      value={type === 'position' ? position[coordinate] : rotation[coordinate]}
      onChange={(e) => {
        updateValue(e);
      }}
    />
  );
};

Slider.propTypes = {
  type: PropTypes.string.isRequired,
  coordinate: PropTypes.string.isRequired,
};

export default Slider;
