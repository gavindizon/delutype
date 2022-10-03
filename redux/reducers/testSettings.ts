import { AnyAction } from "@reduxjs/toolkit";
import { UPDATE_SETTINGS } from "../actions/testSettings";

const initialState: Object = {
    title: "Tagalog - 100 words",
    text: "Ang wikang Kastila ay naging wika ng pamahalaan, edukasyon, at kalakalan noong buong panahon ng pananakop ng mga Kastila, at nagsilbi pa bilang lingua franca hanggang sa unang gitnang bahagi ng siglo. Noong, naglathala ang Pamahalaan ng Pilipinas ng May mga umiiral ding ibang salin. Hanggang noong, tila higit na nananaig ang salin ng NHI sa mga lathalain, na inilalarawan ng ilang mga batis bilang opisyal o pinagtibay Noong unang bahagi ng pangangasiwa ng Estados Unidos sa mga Kapuluan ng Pilipinas, ang wikang Kastila ay malawak na sinasalita at matamng napanatili sa buong panahon ng pananakop ng mga Amerikano noon.",
    showWPM: false,
    layout: "QWERTY",
};

const testSettingsReducer = (state: any = initialState, action: AnyAction) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default testSettingsReducer;
