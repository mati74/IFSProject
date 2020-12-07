import Splash from '../screens/Splash';
import Chat from '../screens/Chat';

const Routes = [
    {
        name: "Splash",
        component: Splash,
        options: { headerShown: false }
    },
    {
        name: "Chat",
        component: Chat,
        options: { headerShown: false }
    }
]
export default Routes
