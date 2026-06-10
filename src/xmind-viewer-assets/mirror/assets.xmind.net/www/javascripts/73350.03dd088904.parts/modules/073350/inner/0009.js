export default [
    function (e, t, i) {
        'use strict';
        i.d(t, 'b', function () {
            return n;
        });
        const n = {
            PADDING: 20,
            MARGIN: 0,
            TOPIC_SELECTBOX_PADDING: 2,
            TOPIC_SELECTBOX_STROKE_WIDTH: 2,
            TOPIC_SELECTBOX_RADIUS: 4,
            ROTATEDCOS: Math.cos(Math.PI / 9),
            ROTATEDSIN: Math.sin(Math.PI / 9),
            ROTATEDTAN: Math.tan(Math.PI / 9),
            COL_GAP: 13,
            EXT_GAP: 14,
            COL_RADIUS: 6,
            EXT_RADIUS: 8,
            MATRIX_PLUS_RADIUS: 9,
            MATRIX_CELL_PADDING: 5,
            MATRIX_CELL_DEFAULT_WIDTH: 40,
            SUMMARYLINEMARGIN: {
                TOSUMMARY: 10,
                TORANGE: 10,
                TOBOUNDARY: 5,
            },
            RELATIONSHIP_TO_TOPIC_PADDING: 4,
            LINECOLPOS: 13,
            LINE: {
                LINE_SPACING: 16,
                LINE_TIMELINE_THROUGH_SPACING: 4,
            },
            BRACE_LEFT_RIGHT_END_POSITION_SPACING: 16,
            STACKGAP: 5,
            NEWCLOUDCORNERLEN: 40,
            CROSSBOUNDARYLEN: 10,
            TREE_TABLE_CELL_PADDING_VERTICAL: 6,
            TREE_TABLE_CELL_PADDING_HORIZON: 10,
            BOUNDARYGAP_IN_TREETABLE: 4,
            BOUNDARYGAP: 10,
            ROUNDEDRECT_BOUNDARY_RADIUS: 14,
            BOUNDARY_TITLE: {
                TO_BOUNDARY_BORDER_DISTANCE: 14,
                CONTENT_PADDING_HORIZON: 10,
                CONTENT_PADDING_VERTICAL: 5,
                TOP_LEFT_RADIUS: 8,
                TOP_RIGHT_RADIUS: 8,
                BOTTOM_LEFT_RADIUS: 1,
                BOTTOM_RIGHT_RADIUS: 1,
            },
            IMAGE_MAX_SIZE: 2e3,
            MATH_JAX_IMAGE_PADDING: 10,
            MATH_JAX_INIT_SIZE_PLUS_MULTIPLE: 1.5,
            MATH_JAX_MAX_WIDTH: 2e3,
            FISH_BONE: {
                BONE_PADDING_HORIZON: 60,
                BONE_PADDING_VERTICAL: 40,
                SUB_BONE_PADDING_VERTICAL: 20,
                FIRST_BONE_CONNECTION_DISTANCE: 30,
                BONE_CONNECTION_DISTANCE: 30,
                BONE_CONNECTION_TAN: Math.tan((Math.PI / 180) * 60),
                HEAD_BONE_LINE_MIN_BODY_WIDTH: 0,
                HEAD_BONE_LINE_EXTEND_BODY_WIDTH: 60,
            },
            TIMELINE: { MAIN_LINE_WIDTH: 2 },
            MAX_BRANCH_POSITION_REALIGN_OFFSET: 30,
            BRANCH_POSITION_REALIGN_RATIO: 0.15,
        };
        t.a = n;
    },
];
