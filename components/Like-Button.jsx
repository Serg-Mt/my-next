import { useState } from 'react';

export function LikeButton({ start = 0, step = 1, big, color, bordered = false }) {
  const
    [like, setLike] = useState(start),
    [border, setBorder] = useState(bordered),

    style = {
      color,
      fontSize: big ? 'xx-large' : '',
      outline: border ? '3px solid blue' : ''
    }
  return <><button
    style={style}
    onClick={() => setLike(prev => +step + prev)}
    onContextMenu={event => {event.preventDefault();setBorder(prev => !prev);}}
  >
    Like: {like}
  </button>
  </>;
}


