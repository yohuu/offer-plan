import {
    // create naive ui
    create,
    // component
    NButton,
    NTable,
    NDatePicker,
    NInput,
    NButtonGroup,
    NIcon,
    NAlert
} from 'naive-ui'

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

export default create({
    components: [NButton, NTable, NDatePicker, NInput, NButtonGroup, NIcon, NAlert]
})
