/*
 * Copyright 2013-2015, Teradata, Inc. All rights reserved.
 */
(function () {
    'use strict';

    angular.module('benchmarkServiceUI.filters', [])
        .filter('duration', ['numberFilter', function (numberFilter) {
            return function (value) {
                if ((value / 1000) < 1) {
                    return numberFilter(value, 3, 4) + ' ms';
                }
                value /= 1000;

                if ((value / 60) < 1) {
                    return numberFilter(value, 3, 4) + ' s';
                }
                value /= 60;

                if ((value / 60) < 1) {
                    return numberFilter(value, 3, 4) + ' m';
                }

                return numberFilter(value, 3, 4) + ' h';
            }
        }])
        .filter('unit', ['numberFilter', 'durationFilter', function (numberFilter, durationFilter) {
            return function (value, unit) {
                var outputValueText = '';
                var outputUnitText = '';

                if (unit === 'MILLISECONDS') {
                    outputValueText = durationFilter(value)
                }
                else if (unit === 'BYTES') {
                    if ((value / 1000) < 1) {
                        return numberFilter(value, 3) + ' B';
                    }
                    value /= 1000;
                    if ((value / 1000) < 1) {
                        return numberFilter(value, 3) + ' kB';
                    }
                    value /= 1000;
                    if ((value / 1000) < 1) {
                        return numberFilter(value, 3) + ' MB';
                    }
                    value /= 1000;

                    return numberFilter(value, 3) + ' GB';
                }
                else if (unit === 'PERCENT') {
                    outputValueText += numberFilter(value, 2);
                    outputUnitText = '%';
                }
                else if (unit === 'QUERY_PER_SECOND') {
                    outputValueText += numberFilter(value, 2);
                    outputUnitText = 'query/sec';
                }
                else {
                    outputValueText += numberFilter(value, 2);
                    outputUnitText = unit;
                }

                return outputValueText + ' ' + outputUnitText;
            };
        }]);
}());