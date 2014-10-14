(function() {

    var lock = true;
    var base_url = "https://mapbox-cloudless-testing.s3.amazonaws.com/landsat8/crowd/";
    var currentSubject = null;
    
    
    function putImage(canvas, src, dfd) {
        var ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        var img = new Image();

        img.onload = function() {
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            dfd.resolve();
        }
        img.src = src;
    }


    function getSubject() {

        $.get('subject', function(data) {
            // Update image here
            var subEl = document.getElementById("subimg");
            var patEl = document.getElementById("patimg");

            subimg = base_url + data._id + "/subimage.png";
            patimg = base_url + data._id + "/patch.png";

            var dfd1 = new jQuery.Deferred();
            var dfd2 = new jQuery.Deferred();

            $.when(dfd1, dfd2).done(function(v1, v2) {
                currentSubject = data;
                lock = false;
            });

            putImage(subEl, subimg, dfd1);
            putImage(patEl, patimg, dfd2);
        });
    }


    function onClassification(userResponse) {
        if (lock === true) {
            return;
        }
        console.log('postClassification', currentSubject);

        var classification = {
            isCloudy: userResponse,
            subjectId: currentSubject._id
        }
        $.post('classification', classification, function(data) {
            getSubject();
        });
    }
    
    
    function setupClassification(el) {
        React.renderComponent(ClassificationComponent(), el, function() {
            $(".classification").on('click', function(evt) {
                var dataset = evt.target.dataset;
                var classification = dataset.value;

                onClassification(classification);
            });
            
            getSubject();
        });
    }
    
    
    function isLoggedIn() {

        $.get('user', function(data) {
            var el = document.querySelector(".main");
            
            if (data.user) {
                setupClassification(el);
            } else {
                React.renderComponent(LoginComponent(), el);
            }
        });

    }

    function onDOM() {
        isLoggedIn();
    }
    
    document.addEventListener('DOMContentLoaded', onDOM);
})();
