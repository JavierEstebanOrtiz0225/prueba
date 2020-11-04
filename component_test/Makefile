microservices := be_entity
test-all-components:
	for microservice in $(microservices) ; do \
	cp -r /opt/app/$$microservice/docfiles /opt/app/testing_components_v1/component_test/docfiles &&\
	npm run test --forceExit &&\
	rm -r /opt/app/testing_components_v1/component_test/docfiles;\
	done
# npm run componentest;

# receives 
test-component:
	cp -r $(containerFolder)/mesfix/$(microservice)/docfiles docfiles;

# receives api to be tested
test-api:
	mkdir -p docfiles/apis/ &&\
	cp /opt/app/$(microservice)/docfiles/*.json docfiles/MsDocfile.json &&\
	cp -r /opt/app/$(microservice)/docfiles/apis/$(api) docfiles/apis/api;

# receives endpoint to be tested
test-endpoint:
	mkdir -p docfiles/apis/api/endpoints &&\
	cp /opt/app/$(microservice)/docfiles/*.json docfiles/MsDocfile.json &&\
	cp /opt/app/$(microservice)/docfiles/apis/$(api)/*.json docfiles/apis/api/apiDocfile.json &&\
	cp /opt/app/$(microservice)/docfiles/apis/$(api)/endpoints/$(endpoint) docfiles/apis/api/endpoints/$(endpoint);