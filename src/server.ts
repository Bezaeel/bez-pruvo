import app from './providers/http/createApp';
import { PORT } from './types/consts';

app.listen(PORT, () => console.log(`API listening on port ${PORT}`));