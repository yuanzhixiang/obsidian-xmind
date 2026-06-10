export default [
    function (e, t, i) {
        'use strict';
        var n = i(32),
            r = i(0),
            o = i(28);
        var a, s, l, c;
        (!(function (e) {
            ((e.CENTRAL_TOPIC = 'centralTopic'),
                (e.MAIN_TOPIC = 'mainTopic'),
                (e.SUB_TOPIC = 'subTopic'),
                (e.SUMMARY_TOPIC = 'summaryTopic'),
                (e.CALLOUT_TOPIC = 'calloutTopic'),
                (e.FLOATING_TOPIC = 'floatingTopic'),
                (e.BOUNDARY = 'boundary'),
                (e.SUMMARY = 'summary'),
                (e.RELATIONSHIP = 'relationship'),
                (e.MAP = 'map'),
                (e.IMPORTANT_TOPIC = 'importantTopic'),
                (e.MINOR_TOPIC = 'minorTopic'),
                (e.EXPIRED_TOPIC = 'expiredTopic'),
                (e.GLOBAL = 'global'));
        })(a || (a = {})),
            (function (e) {
                ((e.ZH_CN = 'zh-CN'),
                    (e.EN_US = 'en-US'),
                    (e.ZH_HK = 'zh-HK'),
                    (e.ZH_TW = 'zh-TW'),
                    (e.JA_JP = 'ja-JP'),
                    (e.DE_DE = 'de-DE'),
                    (e.FR_FR = 'fr-FR'),
                    (e.ES_ES = 'es'),
                    (e.ID_ID = 'id'),
                    (e.IT_IT = 'it-IT'),
                    (e.KR_KR = 'ko'),
                    (e.PT_PT = 'pt-PT'),
                    (e.RU_RU = 'ru-RU'),
                    (e.TH_TH = 'th'),
                    (e.AR_AR = 'ar'));
            })(s || (s = {})),
            (function (e) {
                ((e.LightGrayish = 'LightGrayish'),
                    (e.Light = 'Light'),
                    (e.LightPlus = 'LightPlus'),
                    (e.Dark = 'Dark'),
                    (e.Deep = 'Deep'),
                    (e.Pale = 'Pale'),
                    (e.PalePlus = 'PalePlus'),
                    (e.Dull = 'Dull'),
                    (e.V = 'V'),
                    (e.Bright = 'Bright'),
                    (e.S = 'S'),
                    (e.Soft = 'Soft'),
                    (e.GyLight = 'GyLight'),
                    (e.GyDark = 'GyDark'),
                    (e.Gray = 'Gray'),
                    (e.Grayish = 'Grayish'),
                    (e.MaterialPale = 'MaterialPale'),
                    (e.MaterialBright = 'MaterialBright'),
                    (e.MaterialBrightPlus = 'MaterialBrightPlus'),
                    (e.MaterialVivid = 'MaterialVivid'),
                    (e.MaterialVividPlus = 'MaterialVividPlus'),
                    (e.MaterialDeep = 'MaterialDeep'),
                    (e.MaterialDeepPlus = 'MaterialDeepPlus'),
                    (e.MaterialGray = 'MaterialGray'));
            })(l || (l = {})),
            (function (e) {
                ((e.TYPE_A = 'TYPE_A'),
                    (e.TYPE_B = 'TYPE_B'),
                    (e.TYPE_C = 'TYPE_C'),
                    (e.MULTI_LINE_COLORS = 'MULTI_LINE_COLORS'));
            })(c || (c = {})));
        var d;
        !(function (e) {
            ((e.Energy = 'Energy'),
                (e.Freshness = 'Freshness'),
                (e.Kimono = 'Kimono'),
                (e.Forid = 'Forid'),
                (e.Elegant = 'Elegant'),
                (e.Quaint = 'Quaint'),
                (e.Variety = 'Variety'),
                (e.Dazzling = 'Dazzling'),
                (e.Vintage = 'Vintage'),
                (e.Dessert = 'Dessert'),
                (e.Vanllia = 'Vanllia'),
                (e.Candy = 'Candy'),
                (e.Pebble = 'Pebble'),
                (e.GreenTea = 'GreenTea'),
                (e.CyberPunk = 'CyberPunk'),
                (e.PurpleLight = 'PurpleLight'),
                (e.Space = 'Space'),
                (e.Sakura = 'Sakura'),
                (e.Fire = 'Fire'),
                (e.Christmas = 'Christmas'),
                (e.Ink = 'Ink'),
                (e.DeepSea = 'DeepSea'),
                (e.Islands = 'Islands'),
                (e.Latte = 'Latte'),
                (e.Violet = 'Violet'),
                (e.Roses = 'Roses'),
                (e.Rainforest = 'Rainforest'),
                (e.Rainbow = 'Rainbow'));
        })(d || (d = {}));
        (d.Rainbow,
            d.Energy,
            d.Freshness,
            d.Kimono,
            d.Forid,
            d.Quaint,
            d.Variety,
            d.Dazzling,
            d.Vintage,
            d.Dessert,
            d.Vanllia,
            d.Candy,
            d.GreenTea,
            d.CyberPunk,
            d.Space,
            d.Sakura,
            d.Fire,
            d.Christmas,
            d.DeepSea,
            d.Islands,
            d.Violet,
            d.Roses,
            d.Rainforest,
            a.IMPORTANT_TOPIC,
            a.MINOR_TOPIC,
            a.IMPORTANT_TOPIC,
            a.MINOR_TOPIC,
            a.IMPORTANT_TOPIC,
            a.MINOR_TOPIC,
            a.IMPORTANT_TOPIC,
            a.MINOR_TOPIC,
            a.IMPORTANT_TOPIC,
            a.MINOR_TOPIC,
            a.IMPORTANT_TOPIC,
            a.MINOR_TOPIC,
            d.Energy,
            d.Freshness,
            d.Kimono,
            d.Forid,
            d.Elegant,
            d.Quaint,
            d.Variety,
            d.Dazzling,
            d.Vintage,
            d.Vanllia,
            d.Pebble,
            d.GreenTea,
            d.CyberPunk,
            d.PurpleLight,
            d.Fire,
            d.Ink,
            d.DeepSea,
            d.Islands,
            d.Latte,
            d.Violet,
            d.Roses,
            d.Rainforest,
            d.Vintage,
            d.Dessert,
            d.Candy,
            d.Space,
            d.Sakura,
            d.Christmas,
            d.Rainbow);
        var f, h;
        (!(function (e) {
            ((e.VLight = 'Vivid Light'),
                (e.VDark = 'Vivid Dark'),
                (e.VColorful = 'Vivid Colorful'),
                (e.LightGrayish = 'Light Grayish'),
                (e.LightDark = 'Light Dark'),
                (e.LightColorful = 'Light Colorful'),
                (e.Gray = 'Gray'),
                (e.GrayLight = 'Gray Light'),
                (e.GrayDark = 'Gray Dark'),
                (e.Classic = 'Classic'),
                (e.ClassicColorful = 'Classic Colorful'),
                (e.Mono = 'Mono'),
                (e.RainBow = 'Rainbow'),
                (e.SkeletonGray = 'SkeletonGray'));
        })(f || (f = {})),
            (function (e) {
                ((e.MindMap = 'Mind Map'),
                    (e.BraceMap = 'Brace Map'),
                    (e.LogicChart = 'Logic Chart'),
                    (e.OrgChart = 'Org Chart'),
                    (e.TreeChart = 'Tree Chart'),
                    (e.Timeline = 'Timeline'),
                    (e.Fishbone = 'Fishbone'),
                    (e.TreeTable = 'Tree Table'),
                    (e.Matrix = 'Matrix'));
            })(h || (h = {})));
        (h.MindMap,
            h.LogicChart,
            h.BraceMap,
            h.OrgChart,
            h.TreeChart,
            h.Timeline,
            h.Fishbone,
            h.TreeTable,
            h.Matrix,
            f.Classic,
            f.ClassicColorful,
            f.VLight,
            f.VDark,
            f.VColorful,
            f.LightGrayish,
            f.LightDark,
            f.LightColorful,
            f.Gray,
            f.Mono,
            f.RainBow);
        const p = {
            Happiness: {
                list: [
                    '#b91f57',
                    '#d02f48',
                    '#dd443b',
                    '#e95b23',
                    '#e67800',
                    '#f49d00',
                    '#f1b500',
                    '#eec900',
                    '#d2c100',
                    '#a8bb00',
                    '#58a91d',
                    '#00a15a',
                    '#00926e',
                    '#00857f',
                    '#007488',
                    '#00709b',
                    '#00609c',
                    '#005ba5',
                    '#1a54a5',
                    '#534aa0',
                    '#703f96',
                    '#81378a',
                    '#8f2e7c',
                    '#ad2e6c',
                ],
            },
            [l.Bright]: {
                list: [
                    '#ef6c70',
                    '#fa8155',
                    '#ffad36',
                    '#fad831',
                    '#b7c82b',
                    '#41b879',
                    '#00aa9f',
                    '#0098b9',
                    '#2981c0',
                    '#7574bc',
                    '#a165a8',
                    '#d0678e',
                ],
            },
            [l.Soft]: {
                list: [
                    '#ca8281',
                    '#da927a',
                    '#dba66b',
                    '#d3bd6c',
                    '#adb66b',
                    '#76b18a',
                    '#54a39b',
                    '#5192a4',
                    '#5d7ea0',
                    '#7878a0',
                    '#907194',
                    '#b4788b',
                ],
            },
            [l.Deep]: {
                list: [
                    '#a61d39',
                    '#ab3d1d',
                    '#b16c00',
                    '#b39300',
                    '#748400',
                    '#007243',
                    '#006664',
                    '#005476',
                    '#004280',
                    '#3e337b',
                    '#612469',
                    '#861d55',
                ],
            },
            [l.LightPlus]: {
                list: [
                    '#f19896',
                    '#ffa787',
                    '#ffbe71',
                    '#f2d96e',
                    '#c7d36d',
                    '#85ce9e',
                    '#62c0b5',
                    '#5bafc4',
                    '#6c9ac5',
                    '#9091c3',
                    '#b088b5',
                    '#d98ea5',
                ],
            },
            [l.Light]: {
                list: [
                    '#f6aba5',
                    '#ffb99e',
                    '#ffce90',
                    '#fbe68f',
                    '#d8df92',
                    '#9cd9ac',
                    '#7eccc1',
                    '#79baca',
                    '#83a7c8',
                    '#a29fc7',
                    '#b89ab8',
                    '#daa0b3',
                ],
            },
            [l.Dull]: {
                list: [
                    '#a35a5c',
                    '#af6954',
                    '#b37f46',
                    '#ab9446',
                    '#858f46',
                    '#4f8766',
                    '#2a7b76',
                    '#246a7d',
                    '#34597d',
                    '#54527c',
                    '#6c4a71',
                    '#8b4f65',
                ],
            },
            [l.Dark]: {
                list: [
                    '#692934',
                    '#75362a',
                    '#794d1c',
                    '#74601f',
                    '#525b20',
                    '#23523a',
                    '#004746',
                    '#004558',
                    '#123452',
                    '#322d51',
                    '#432848',
                    '#612d46',
                ],
            },
            [l.PalePlus]: {
                list: [
                    '#e8c2bf',
                    '#ebc2b5',
                    '#f4d4b0',
                    '#f2e6b8',
                    '#d8ddad',
                    '#aed4b9',
                    '#a6d4cc',
                    '#add1da',
                    '#afc0d1',
                    '#bbbdd0',
                    '#c8b9c9',
                    '#dec4ca',
                ],
            },
            [l.Pale]: {
                list: [
                    '#e7d5d4',
                    '#e9d5cf',
                    '#f6e3ce',
                    '#efe6c6',
                    '#e6e9c6',
                    '#c4e0cb',
                    '#bfe0d9',
                    '#c6dde2',
                    '#c2ccd5',
                    '#c9cad5',
                    '#d0c8d1',
                    '#e4d5d9',
                ],
            },
            [l.LightGrayish]: {
                list: [
                    '#c0abaa',
                    '#c1aba5',
                    '#cebba8',
                    '#c6bea1',
                    '#bdc1a2',
                    '#9db6a5',
                    '#98b6b1',
                    '#9eb4b9',
                    '#9ba5af',
                    '#a2a2af',
                    '#aba0ab',
                    '#bdacb0',
                ],
            },
            [l.Grayish]: {
                list: [
                    '#745c5c',
                    '#755c57',
                    '#806c5c',
                    '#786f57',
                    '#6e725a',
                    '#53665a',
                    '#4e6764',
                    '#4f656c',
                    '#4c5765',
                    '#565566',
                    '#605262',
                    '#725c63',
                ],
            },
            DarkGrayish: {
                list: [
                    '#3e2d30',
                    '#3f2e2c',
                    '#4a3c32',
                    '#443e30',
                    '#3d4033',
                    '#2a342e',
                    '#273434',
                    '#273439',
                    '#222933',
                    '#292734',
                    '#302531',
                    '#3d2e34',
                ],
            },
            [l.Gray]: {
                list: [
                    '#f1f1f1',
                    '#d6d6d6',
                    '#bbbbbb',
                    '#a1a1a1',
                    '#878787',
                    '#6d6d6d',
                    '#545454',
                    '#3c3c3c',
                    '#272727',
                ],
            },
            [l.GyLight]: {
                list: ['#d6d6d6', '#bbbbbb', '#a1a1a1'],
            },
            [l.GyDark]: { list: ['#6d6d6d', '#545454', '#3c3c3c'] },
            [l.S]: {
                list: [
                    '#c53f4d',
                    '#cc572e',
                    '#e19215',
                    '#debc03',
                    '#9cad00',
                    '#008f56',
                    '#00827c',
                    '#006f92',
                    '#005b9b',
                    '#534c98',
                    '#7c3d84',
                    '#a33c6a',
                ],
            },
            [l.V]: {
                list: [
                    '#d02f48',
                    '#e95b23',
                    '#f49d00',
                    '#eec900',
                    '#a8bb00',
                    '#00a15a',
                    '#00857f',
                    '#00709b',
                    '#005ba5',
                    '#534aa0',
                    '#81378a',
                    '#ad2e6c',
                ],
            },
            [l.MaterialPale]: {
                list: [
                    '#ffebee',
                    '#FFF3E0',
                    '#F9FBE7',
                    '#E8F5E9',
                    '#E0F2F1',
                    '#E0F7FA',
                    '#E3F2FD',
                    '#E8EAF6',
                    '#F3E5F5',
                    '#FCE4EC',
                ],
            },
            [l.MaterialBright]: {
                list: [
                    '#ef5350',
                    '#FFA726',
                    '#D4E157',
                    '#66BB6A',
                    '#26A69A',
                    '#26C6DA',
                    '#42A5F5',
                    '#5C6BC0',
                    '#AB47BC',
                    '#EC407A',
                ],
            },
            [l.MaterialBrightPlus]: {
                list: [
                    '#f44336',
                    '#FF9800',
                    '#CDDC39',
                    '#4CAF50',
                    '#009688',
                    '#00BCD4',
                    '#2196F3',
                    '#3F51B5',
                    '#9C27B0',
                    '#E91E63',
                ],
            },
            [l.MaterialVivid]: {
                list: [
                    '#e53935',
                    '#FB8C00',
                    '#C0CA33',
                    '#43A047',
                    '#00897B',
                    '#00ACC1',
                    '#1E88E5',
                    '#3949AB',
                    '#8E24AA',
                    '#D81B60',
                ],
            },
            [l.MaterialVividPlus]: {
                list: [
                    '#d32f2f',
                    '#F57C00',
                    '#AFB42B',
                    '#388E3C',
                    '#00796B',
                    '#0097A7',
                    '#1976D2',
                    '#303F9F',
                    '#7B1FA2',
                    '#C2185B',
                ],
            },
            [l.MaterialDeep]: {
                list: [
                    '#c62828',
                    '#EF6C00',
                    '#9E9D24',
                    '#2E7D32',
                    '#00695C',
                    '#00838F',
                    '#1565C0',
                    '#283593',
                    '#6A1B9A',
                    '#AD1457',
                ],
            },
            [l.MaterialDeepPlus]: {
                list: [
                    '#b71c1c',
                    '#E65100',
                    '#827717',
                    '#1B5E20',
                    '#004D40',
                    '#006064',
                    '#0D47A1',
                    '#1A237E',
                    '#4A148C',
                    '#880E4F',
                ],
            },
            [l.MaterialGray]: {
                list: [
                    '#FAFAFA',
                    '#F5F5F5',
                    '#EEEEEE',
                    '#E0E0E0',
                    '#BDBDBD',
                    '#9E9E9E',
                    '#757575',
                    '#616161',
                    '#424242',
                    '#212121',
                ],
            },
        };
        var T;
        !(function (e) {
            ((e.FONT_FAMILY = 'fo:font-family'),
                (e.FONT_STYLE = 'fo:font-style'),
                (e.FONT_WEIGHT = 'fo:font-weight'),
                (e.FONT_SIZE = 'fo:font-size'),
                (e.TEXT_COLOR = 'fo:color'),
                (e.TEXT_ALIGN = 'fo:text-align'),
                (e.TEXT_BULLET = 'fo:text-bullet'),
                (e.TEXT_TRANSFORM = 'fo:text-transform'),
                (e.TEXT_DECORATION = 'fo:text-decoration'),
                (e.TEXT_BACKGROUND_COLOR = 'fo:background-color'),
                (e.MARGIN_LEFT = 'fo:margin-left'),
                (e.MARGIN_RIGHT = 'fo:margin-right'),
                (e.MARGIN_TOP = 'fo:margin-top'),
                (e.MARGIN_BOTTOM = 'fo:margin-bottom'),
                (e.SPACING_MAJOR = 'spacing-major'),
                (e.SPACING_MINOR = 'spacing-minor'),
                (e.SHAPE_CLASS = 'shape-class'),
                (e.SHAPE_CORNER = 'shape-corner'),
                (e.LINE_CORNER = 'line-corner'),
                (e.LINE_COLOR = 'line-color'),
                (e.LINE_CLASS = 'line-class'),
                (e.LINE_WIDTH = 'line-width'),
                (e.LINE_PATTERN = 'line-pattern'),
                (e.LINE_TAPERED = 'line-tapered'),
                (e.BORDER_LINE_COLOR = 'border-line-color'),
                (e.BORDER_LINE_WIDTH = 'border-line-width'),
                (e.BORDER_LINE_PATTERN = 'border-line-pattern'),
                (e.CALLOUT_FILL_COLOR = 'callout-fill-color'),
                (e.CALLOUT_LINE_CLASS = 'callout-line-class'),
                (e.CALLOUT_LINE_CORNER = 'callout-line-corner'),
                (e.CALLOUT_LINE_PATTERN = 'callout-line-pattern'),
                (e.CALLOUT_LINE_WIDTH = 'callout-line-width'),
                (e.CALLOUT_SHAPE_CLASS = 'callout-shape-class'),
                (e.CALLOUT_LINE_COLOR = 'callout-line-color'),
                (e.OPACITY = 'svg:opacity'),
                (e.FILL_COLOR = 'svg:fill'),
                (e.BACKGROUND = 'background'),
                (e.ARROW_END_CLASS = 'arrow-end-class'),
                (e.ARROW_BEGIN_CLASS = 'arrow-begin-class'),
                (e.ALLOW_OVERLAP = 'allow-overlap'),
                (e.ALLOW_FREE_POSITION = 'allow-free-position'),
                (e.GRADIENT_COLOR = 'color-gradient'),
                (e.MULTI_LINE_COLORS = 'multi-line-colors'),
                (e.CJK_FONT_FAMILY = 'cjk-font-family'),
                (e.STRUCTURE_CLASS = 'structure-class'),
                (e.COLOR_LIST = 'color-list'),
                (e.FILL_GRADIENT = 'fill-gradient'),
                (e.BORDER_GRADIENT = 'border-gradient'),
                (e.ALIGNMENT_BY_LEVEL = 'alignment-by-level'),
                (e.FILL_PATTERN = 'fill-pattern'));
        })(T || (T = {}));
        (T.SHAPE_CLASS,
            T.BORDER_LINE_WIDTH,
            T.LINE_CLASS,
            T.LINE_WIDTH,
            T.FILL_COLOR,
            T.BORDER_LINE_COLOR,
            T.FONT_FAMILY,
            T.FONT_STYLE,
            T.FONT_WEIGHT,
            T.FONT_SIZE,
            T.TEXT_TRANSFORM,
            T.TEXT_DECORATION,
            T.LINE_PATTERN,
            T.FILL_PATTERN,
            T.BORDER_LINE_PATTERN,
            T.ARROW_END_CLASS,
            T.FILL_COLOR,
            T.BORDER_LINE_COLOR,
            T.LINE_COLOR,
            T.TEXT_COLOR);
        var u;
        !(function (e) {
            ((e.PRIMARY_COLOR_0 = 'PRIMARY_COLOR_0'),
                (e.PRIMARY_COLOR_1 = 'PRIMARY_COLOR_1'),
                (e.PRIMARY_COLOR_2 = 'PRIMARY_COLOR_2'),
                (e.PRIMARY_COLOR_3 = 'PRIMARY_COLOR_3'),
                (e.PRIMARY_COLOR_4 = 'PRIMARY_COLOR_4'),
                (e.SECONDARY_COLOR_1 = 'SECONDARY_COLOR_1'),
                (e.SECONDARY_COLOR_2 = 'SECONDARY_COLOR_2'),
                (e.SECONDARY_COLOR_3 = 'SECONDARY_COLOR_3'),
                (e.QUICK_COLOR_1 = 'QUICK_COLOR_1'),
                (e.QUICK_COLOR_2 = 'QUICK_COLOR_2'),
                (e.QUICK_COLOR_3 = 'QUICK_COLOR_3'),
                (e.LIGHT_COLOR = 'LIGHT_COLOR'),
                (e.DARK_COLOR = 'DARK_COLOR'),
                (e.TRANSPARENT = 'TRANSPARENT'),
                (e.MULTI_LINE_COLORS = 'MULTI_LINE_COLORS'),
                (e.COLOR_LIST = 'COLOR_LIST'));
        })(u || (u = {}));
        (a.CENTRAL_TOPIC,
            a.MAIN_TOPIC,
            a.SUB_TOPIC,
            a.FLOATING_TOPIC,
            a.SUMMARY_TOPIC,
            a.CALLOUT_TOPIC,
            a.IMPORTANT_TOPIC,
            a.MINOR_TOPIC);
        const g = [a.IMPORTANT_TOPIC, a.MINOR_TOPIC, a.EXPIRED_TOPIC];
        a.GLOBAL;
        var Q;
        !(function (e) {
            ((e.MAP = 'MAP'), (e.TABLE = 'TABLE'));
        })(Q || (Q = {}));
        (T.TEXT_COLOR, T.FILL_COLOR, T.LINE_COLOR, T.BORDER_LINE_COLOR);
        function m(e) {
            return e.map((e) => p[e.colorListName].list[e.index / 2 - 1]);
        }
        (m([
            { colorListName: l.Bright, index: 4 },
            { colorListName: l.Bright, index: 6 },
            { colorListName: l.Bright, index: 10 },
            { colorListName: l.Bright, index: 16 },
            { colorListName: l.Bright, index: 20 },
            { colorListName: l.Bright, index: 22 },
        ]),
            m([
                { colorListName: l.LightPlus, index: 8 },
                { colorListName: l.LightPlus, index: 6 },
                { colorListName: l.Bright, index: 4 },
                { colorListName: l.Deep, index: 2 },
                { colorListName: l.S, index: 2 },
                { colorListName: l.LightPlus, index: 4 },
            ]),
            m([
                { colorListName: l.MaterialBrightPlus, index: 14 },
                { colorListName: l.MaterialVivid, index: 14 },
                { colorListName: l.MaterialVividPlus, index: 14 },
                { colorListName: l.MaterialDeep, index: 14 },
                { colorListName: l.MaterialDeepPlus, index: 14 },
                { colorListName: l.MaterialDeep, index: 16 },
            ]),
            m([
                { colorListName: l.PalePlus, index: 2 },
                { colorListName: l.PalePlus, index: 6 },
                { colorListName: l.PalePlus, index: 10 },
                { colorListName: l.PalePlus, index: 14 },
                { colorListName: l.PalePlus, index: 18 },
                { colorListName: l.PalePlus, index: 22 },
            ]),
            m([
                { colorListName: l.Grayish, index: 2 },
                { colorListName: l.LightGrayish, index: 6 },
                { colorListName: l.LightGrayish, index: 12 },
                { colorListName: l.Grayish, index: 18 },
                { colorListName: l.Soft, index: 12 },
                { colorListName: l.Soft, index: 4 },
            ]),
            m([
                { colorListName: l.S, index: 18 },
                { colorListName: l.S, index: 20 },
                { colorListName: l.S, index: 22 },
                { colorListName: l.S, index: 24 },
                { colorListName: l.S, index: 2 },
                { colorListName: l.S, index: 4 },
            ]),
            m([
                { colorListName: l.LightPlus, index: 4 },
                { colorListName: l.LightPlus, index: 2 },
                { colorListName: l.PalePlus, index: 24 },
                { colorListName: l.LightPlus, index: 16 },
                { colorListName: l.LightPlus, index: 6 },
                { colorListName: l.LightPlus, index: 24 },
            ]),
            m([
                { colorListName: l.Soft, index: 6 },
                { colorListName: l.Soft, index: 10 },
                { colorListName: l.Soft, index: 12 },
                { colorListName: l.Soft, index: 14 },
                { colorListName: l.Soft, index: 16 },
                { colorListName: l.Soft, index: 20 },
            ]),
            Object.assign(
                { NONE: 'none', SOLID: 'solid' },
                {
                    SOLID_HAND_DRAWN: 'solid-hand-drawn',
                    HACHURE: 'hachure',
                    HACHURE_LEFT_HAND: 'hachure-left-hand',
                    ZIGZAG: 'zigzag',
                    ZIGZAG_LEFT_HAND: 'zigzag-left-hand',
                    CROSSING: 'crossing',
                }
            ));
        var b = i(1),
            C = function (e, t, i, n) {
                var r,
                    o = arguments.length,
                    a =
                        o < 3
                            ? t
                            : null === n
                              ? (n = Object.getOwnPropertyDescriptor(t, i))
                              : n;
                if (
                    'object' == typeof Reflect &&
                    'function' == typeof Reflect.decorate
                )
                    a = Reflect.decorate(e, t, i, n);
                else
                    for (var s = e.length - 1; s >= 0; s--)
                        (r = e[s]) &&
                            (a =
                                (o < 3 ? r(a) : o > 3 ? r(t, i, a) : r(t, i)) ||
                                a);
                return (o > 3 && a && Object.defineProperty(t, i, a), a);
            };
        const L = [r.STYLE_KEYS.FONT_FAMILY];
        let y = class {
            getStyleValue(e, t, i = {}) {
                let n;
                if (
                    ((t = this.protectedHandleKey(e, t, i)),
                    !i.ignoreSpecialHandle && L.includes(t))
                )
                    return this._getSpecialHandleValue(e, t, i);
                if (!i.ignoreUser) {
                    if (
                        !i.ignoreLayeredBeforeUser &&
                        ((n = this.getLayeredStyleValue(
                            e,
                            r.STYLE_LAYER.BEFORE_USER,
                            t,
                            i
                        )),
                        this.isValidValue(e, t, n))
                    )
                        return n;
                    if (
                        ((n = this.getUserStyleValue(e, t)),
                        this.isValidValue(e, t, n))
                    )
                        return n;
                }
                if (!i.ignoreClass) {
                    if (
                        !i.ignoreParent &&
                        ((n = this.getParentStyleValue(
                            e,
                            t,
                            r.STYLE_PARENT_GROUP.BEFORE_CLASS_GROUP,
                            i
                        )),
                        this.isValidValue(e, t, n))
                    )
                        return n;
                    if (
                        !i.ignoreLayeredBeforeClass &&
                        ((n = this.getLayeredStyleValue(
                            e,
                            r.STYLE_LAYER.BEFORE_CLASS,
                            t,
                            i
                        )),
                        this.isValidValue(e, t, n))
                    )
                        return n;
                    if (
                        ((n = this.getUserClassValue(e, t)),
                        this.isValidValue(e, t, n))
                    )
                        return n;
                }
                if (!i.ignoreTheme) {
                    if (
                        !i.ignoreParent &&
                        ((n = this.getParentStyleValue(
                            e,
                            t,
                            r.STYLE_PARENT_GROUP.BEFORE_THEME_GROUP,
                            i
                        )),
                        this.isValidValue(e, t, n))
                    )
                        return n;
                    if (
                        !i.ignoreLayeredBeforeTheme &&
                        ((n = this.getLayeredStyleValue(
                            e,
                            r.STYLE_LAYER.BEFORE_THEME,
                            t,
                            i
                        )),
                        this.isValidValue(e, t, n))
                    )
                        return n;
                    if (
                        ((n = this.getThemeStyleValue(e, t, i)),
                        this.isValidValue(e, t, n))
                    )
                        return n;
                }
                if (!i.ignoreDefault) {
                    if (
                        !i.ignoreParent &&
                        ((n = this.getParentStyleValue(
                            e,
                            t,
                            r.STYLE_PARENT_GROUP.BEFORE_DEFAULT_GROUP,
                            i
                        )),
                        this.isValidValue(e, t, n))
                    )
                        return n;
                    if (
                        i.defaultStyleProvider &&
                        ((n = i.defaultStyleProvider.getValue(e, t)),
                        this.isValidValue(e, t, n) ||
                            i.defaultStyleProvider.isKeyInteresting(e, t))
                    )
                        return n;
                    if (
                        !i.ignoreLayeredBeforeDefault &&
                        ((n = this.getLayeredStyleValue(
                            e,
                            r.STYLE_LAYER.BEFORE_DEFAULT,
                            t,
                            i
                        )),
                        this.isValidValue(e, t, n))
                    )
                        return n;
                    if (
                        ((n = this.getDefaultStyleValue(e, t)),
                        this.isValidValue(e, t, n))
                    )
                        return n;
                }
                return n;
            }
            getGlobalStyleValue(e, t) {
                if (
                    this.getThemeStyleValue(
                        e,
                        `${r.PRESET_GLOBAL_STYLE_CLASS}_${t}`
                    )
                )
                    return null;
                const i = this.getTheme(e);
                let n =
                    (null == i
                        ? void 0
                        : i.getStyleValue(r.PRESET_GLOBAL_STYLE_CLASS, t)) ||
                    null;
                return (this.isValidValue(e, t, n) || (n = null), n);
            }
            getDataStyleValue(e, t) {
                let i = this.getStyleValue(e, t, {
                    ignoreLayeredBeforeUser: !0,
                });
                return (
                    r.PRIVATE_TOPICSHAPE.includes(i) &&
                        (i = r.PRIVATE_TOPICSHAPE_FALLBACK[i]),
                    i
                );
            }
            _getSpecialHandleValue(e, t, i = {}) {
                if (t === r.STYLE_KEYS.FONT_FAMILY)
                    return this.getSpecialHandleFontFamily(e, i);
            }
            getSpecialHandleFontFamily(e, t = {}) {
                const i = r.STYLE_KEYS.FONT_FAMILY;
                let n = [];
                (t.ignoreUser ||
                    (t.ignoreLayeredBeforeUser ||
                        n.push(
                            this.getLayeredStyleValue(
                                e,
                                r.STYLE_LAYER.BEFORE_USER,
                                i,
                                t
                            )
                        ),
                    n.push(this.getUserStyleValue(e, i, t))),
                    t.ignoreParent ||
                        n.push(
                            this.getParentStyleValue(
                                e,
                                i,
                                r.STYLE_PARENT_GROUP.BEFORE_CLASS_GROUP,
                                t
                            )
                        ),
                    t.ignoreClass ||
                        (t.ignoreLayeredBeforeClass ||
                            n.push(
                                this.getLayeredStyleValue(
                                    e,
                                    r.STYLE_LAYER.BEFORE_CLASS,
                                    i,
                                    t
                                )
                            ),
                        n.push(this.getUserClassValue(e, i, t))),
                    t.ignoreParent ||
                        n.push(
                            this.getParentStyleValue(
                                e,
                                i,
                                r.STYLE_PARENT_GROUP.BEFORE_THEME_GROUP,
                                t
                            )
                        ),
                    t.ignoreTheme ||
                        (t.ignoreLayeredBeforeTheme ||
                            n.push(
                                this.getLayeredStyleValue(
                                    e,
                                    r.STYLE_LAYER.BEFORE_THEME,
                                    i,
                                    t
                                )
                            ),
                        n.push(this.getThemeStyleValue(e, i, t))),
                    t.ignoreParent ||
                        n.push(
                            this.getParentStyleValue(
                                e,
                                i,
                                r.STYLE_PARENT_GROUP.BEFORE_DEFAULT_GROUP,
                                t
                            )
                        ));
                const o = e.getContext().getSheetView().figure.cjkFontFamily;
                return (
                    n.push(o),
                    n.push(e.getContext().config(r.CONFIG.CJK_FONT_FAMILY)),
                    t.ignoreDefault ||
                        (t.ignoreLayeredBeforeDefault ||
                            n.push(
                                this.getLayeredStyleValue(
                                    e,
                                    r.STYLE_LAYER.BEFORE_DEFAULT,
                                    i,
                                    t
                                )
                            ),
                        n.push(this.getDefaultStyleValue(e, i, t))),
                    (n = n.filter((e) => e && '$system$' !== e)),
                    (n = n.concat(r.DEAFULT_FONT_FAMILT.split(','))),
                    (n = n.reduce((e, t) => e.concat(t.split(',')), [])),
                    Array.from(
                        new Set(
                            n
                                .map((e) =>
                                    "'" === e[0] || '"' === e[0] ? e : `'${e}'`
                                )
                                .concat('sans-serif')
                        )
                    ).join(',')
                );
            }
            protectedHandleKey(e, t, i = {}) {
                return t;
            }
            getUserStyle(e, t = {}) {
                return this.protectedGetModel(e).style();
            }
            getUserStyleValue(e, t, i = {}) {
                return this.protectedGetModel(e).getStyleValue(t);
            }
            getClassList(e, t = {}) {
                return this.protectedGetModel(e).classList();
            }
            getUserClassValue(e, t, i = {}) {
                const n = this.getClassList(e, i),
                    r = this.getTheme(e, i);
                let o;
                if (r)
                    for (const i of n) {
                        const n = r.getStyleValue(i, t);
                        this.isValidValue(e, t, n) && (o = n);
                    }
                return o;
            }
            getTheme(e) {
                const t = this.protectedGetModel(e).ownerSheet().theme();
                if (t) return t;
            }
            getThemeStyleValue(e, t, i = {}) {
                const n = this.getSuggestedClassName(e, i),
                    r = this.getTheme(e, i);
                return r && r.getStyleValue(n, t);
            }
            getDefaultStyleValue(e, t, i = {}) {
                const r = this.getClassName(e, i);
                return n.a.getStyleValue(r, t);
            }
            getLayeredStyleValue(e, t, i, n = {}) {
                const r = this._getOverridedStyleManager(e);
                return r && r.getStyleValue(t, i, e, n);
            }
            _getOverridedStyleManager(e) {
                return e.getModule(r.MODULE_NAME.OVERRIDE_STYLE);
            }
            getComputedStyle(e) {
                const t = this.protectedGetComputedStyleKeys(e),
                    i = {};
                return (
                    t.forEach((t) => {
                        const n = this.getStyleValue(e, t);
                        n && (i[t] = n);
                    }),
                    i
                );
            }
            protectedGetComputedStyleKeys(e) {
                return [];
            }
            protectedGetModel(e) {
                return e.model;
            }
            protectedFindStyleSelector(e) {}
            getParentStyleValue(e, t, i, n = {}) {
                const o = this.getLayeredStyleValue(
                    e,
                    r.STYLE_LAYER.BEFORE_PARENT,
                    t
                );
                return this.isValidValue(e, t, o)
                    ? o
                    : this.protectedParentStyleValue(e, i, t, n);
            }
            protectedParentStyleValue(e, t, i, n) {
                if (t === r.STYLE_PARENT_GROUP.BEFORE_CLASS_GROUP)
                    return i === r.STYLE_KEYS.LINE_WIDTH
                        ? null
                        : this.getGlobalStyleValue(e, i);
            }
            isValidValue(e, t, i, n) {
                return (
                    null != i &&
                    '' !== i &&
                    !(() => {
                        if (n && r.PRIVATE_TOPICSHAPE.includes(i)) return !0;
                    })()
                );
            }
            getClassName(e, t = {}) {
                return '';
            }
            getSuggestedClassName(e, t = {}) {
                return this.getClassName(e, t);
            }
            changeTheme(e, t, i) {}
            updateClassIntoTheme(e, t, i, n) {}
            removeStyleFromClass(e, t, i) {}
            removeClassFromTheme(e, t = []) {}
            getFontInfo(e) {
                return {
                    color: this.getStyleValue(e, r.STYLE_KEYS.TEXT_COLOR),
                    fontSize: this.getStyleValue(e, r.STYLE_KEYS.FONT_SIZE),
                    fontFamily: this.getStyleValue(e, r.STYLE_KEYS.FONT_FAMILY),
                    fontStyle: this.getStyleValue(e, r.STYLE_KEYS.FONT_STYLE),
                    fontWeight: this.getStyleValue(e, r.STYLE_KEYS.FONT_WEIGHT),
                    textAlign: this.getStyleValue(e, r.STYLE_KEYS.TEXT_ALIGN),
                    textTransform: this.getStyleValue(
                        e,
                        r.STYLE_KEYS.TEXT_TRANSFORM
                    ),
                    textDecoration: this.getStyleValue(
                        e,
                        r.STYLE_KEYS.TEXT_DECORATION
                    ),
                };
            }
            fixUserStyle(e, t) {
                const i = this.protectedFindStyleSelector(e).getUserStyle(e);
                if (!i) return;
                const n = i.toJSON(),
                    o = this.protectedFindStyleSelector(e),
                    a = this.getStyleKeysToBeFixByTheme(e, t);
                (i.keys().forEach((s) => {
                    const l = i.getValue(s),
                        c = o.getUserClassValue(e, s),
                        d = o.getThemeStyleValue(e, s);
                    if (
                        (l === c || l === d || a.includes(s)) &&
                        (delete n.properties[s], s === r.STYLE_KEYS.FILL_COLOR)
                    ) {
                        const i = this.getFixedUserFillColor(e, l, t);
                        i && (n.properties[s] = i);
                    }
                }),
                    this.protectedGetModel(e).setStyleObj(n));
            }
            getStyleKeysToBeFixByTheme(e, t) {
                var i, n;
                const r = this.getClassName(e, t);
                return Array.isArray(null == t ? void 0 : t.styleKeysToBeFix)
                    ? t.styleKeysToBeFix
                    : null !==
                            (n = (
                                null !==
                                    (i =
                                        null == t
                                            ? void 0
                                            : t.styleKeysToBeFix) &&
                                void 0 !== i
                                    ? i
                                    : {}
                            )[r]) && void 0 !== n
                      ? n
                      : this.getDefaultStyleKeysToBeFixByTheme();
            }
            getDefaultStyleKeysToBeFixByTheme() {
                return [];
            }
            getFixedUserFillColor(e, t, i) {
                if (i.newColorTheme) {
                    if (!t) return;
                    if ('none' === t) return t;
                    const n = this.getClassList(e)[0],
                        o = this.getThemeStyleValue(e, r.STYLE_KEYS.FILL_COLOR);
                    if (n === r.CLASS_TYPE.EXPIRED_TOPIC) {
                        if (o) return o;
                    } else if ('none' !== o) return;
                    const a = this.getClassName(e),
                        s = i.newColorTheme.theme[a],
                        l =
                            null == s
                                ? void 0
                                : s.properties[r.STYLE_KEYS.FILL_COLOR];
                    return (
                        l ||
                        Object(b.getSmartFillColorByLineColor)(
                            e,
                            this.getStyleValue(e, r.STYLE_KEYS.LINE_COLOR)
                        )
                    );
                }
                if (i.newSkeletonTheme) {
                    if (!t) return;
                    let n;
                    if (
                        ((n = Object(b.isCentralBranch)(e)
                            ? this.getClassName(e)
                            : this.getClassList(e)[0] || this.getClassName(e)),
                        g.includes(n))
                    )
                        return t;
                    {
                        const e = i.newSkeletonTheme.theme[n];
                        if (
                            'none' ===
                            (null == e
                                ? void 0
                                : e.properties[r.STYLE_KEYS.FILL_COLOR])
                        )
                            return;
                        if ('none' === t) return;
                        return t;
                    }
                }
                if (i.newMultiLineColors) {
                    if (
                        'none' !==
                        this.getThemeStyleValue(e, r.STYLE_KEYS.FILL_COLOR)
                    )
                        return;
                    return Object(b.getSmartFillColorByLineColor)(
                        e,
                        this.getStyleValue(e, r.STYLE_KEYS.LINE_COLOR)
                    );
                }
            }
        };
        y = C(
            [
                (e) =>
                    class extends e {
                        getStyleValue(e, t, i = {}) {
                            const n = super.getStyleValue(
                                e,
                                t,
                                Object.assign(Object.assign({}, i), {
                                    ignoreDynamicPriorityOverridedStyle: !0,
                                    ignoreCompatibilityFix: !0,
                                })
                            );
                            return this.getOverridedValue(e, t, n, i);
                        }
                        getOverridedValue(e, t, i, n) {
                            return [this.getOverridedHandDrawnModeValue].reduce(
                                (i, r) => r.bind(this)(e, t, i, n),
                                i
                            );
                        }
                        getDynamicProprityOverridedValue(e, t, i, n, o) {
                            const a = super.getUserStyleValue(e, i);
                            if (a && a === n) return n;
                            const s = super.getThemeStyleValue(e, i),
                                l = super.getLayeredStyleValue(
                                    e,
                                    r.STYLE_LAYER.DYNAMIC_PRIORITY,
                                    i,
                                    o
                                );
                            return super.getThemeStyleValue(e, `${t}_${i}`)
                                ? s
                                : l;
                        }
                        getDynamicProprityOverridedValueForFontFamily(
                            e,
                            t,
                            i,
                            n,
                            o
                        ) {
                            var a, s, l, c;
                            let d = [];
                            d = [...n.split(',')];
                            const f =
                                    null !==
                                        (s =
                                            null ===
                                                (a = super.getUserStyleValue(
                                                    e,
                                                    i
                                                )) || void 0 === a
                                                ? void 0
                                                : a.split(',')) && void 0 !== s
                                        ? s
                                        : [],
                                h = this.getGlobalStyleValue(e, i),
                                p = h ? h.split(',') : [];
                            if (!f.length) {
                                const n =
                                    null !==
                                        (c =
                                            null ===
                                                (l = super.getLayeredStyleValue(
                                                    e,
                                                    r.STYLE_LAYER
                                                        .DYNAMIC_PRIORITY,
                                                    i,
                                                    o
                                                )) || void 0 === l
                                                ? void 0
                                                : l.split(',')) && void 0 !== c
                                        ? c
                                        : [];
                                super.getThemeStyleValue(e, `${t}_${i}`) ||
                                    (d = Array.from(
                                        new Set([...p, ...n, ...d])
                                    ));
                            }
                            return d.join(',');
                        }
                        getOverridedHandDrawnModeValue(e, t, i, n) {
                            const a = e.getContext();
                            return n.ignoreDynamicPriorityOverridedStyle
                                ? i
                                : (null == a
                                        ? void 0
                                        : a.model.getHandDrawnModeActive()) &&
                                    Object.keys(o.a).includes(t)
                                  ? t === r.STYLE_KEYS.FONT_FAMILY
                                      ? this.getDynamicProprityOverridedValueForFontFamily(
                                            e,
                                            r.STYLE_DESCRIPTOR_FOR_HAND_DRAWN_ID,
                                            t,
                                            i,
                                            n
                                        )
                                      : this.getDynamicProprityOverridedValue(
                                            e,
                                            r.STYLE_DESCRIPTOR_FOR_HAND_DRAWN_ID,
                                            t,
                                            i,
                                            n
                                        )
                                  : i;
                        }
                    },
            ],
            y
        );
        t.a = y;
    },
];
